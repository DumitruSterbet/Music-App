/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { classNames } from "../../lib/utils";
import { useAppUtil, useAppModal, useCurrentUser } from "../../lib/store";
import { useLogout } from "../../lib/actions";
import { useTheme } from "../../hooks";
import { themeConfig } from "../../configs";
import { Icon, Overlay, Title, Tooltip, Button, Skeletons } from "../../components";

const User = () => {
  const { currentUser } = useCurrentUser();
  const { user } = currentUser || {};
  const { email, username, imageUrl } = user || {};

  return (
    <a
      className="gap-2 p-2 rounded flex_justify_between bg-main"
      href="/profile"
    >
      <div className="w-10 h-10 rounded-full flex_justify_center bg-sidebar">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full rounded-full" />
        ) : (
          <Icon name="FaRegUser" size={16} />
        )}
      </div>

      {email && (
        <div className="flex flex-col flex-1 text-sm">
          <span>@{username}</span>
          <span className="break-all text-secondary">{email}</span>
        </div>
      )}
    </a>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [toggleNav, setToggleNav] = useState(false);

  const { logout: signOut } = useLogout();
  const { currentUser } = useCurrentUser();
  const { isLoaded: isLoadedUser, user } = currentUser || {};

  const { getToggleMenu, toggleMenu, searchRef, getToggleSearch } =
    useAppUtil();

  const [theme] = useTheme();
  const { close: modalClose } = useAppModal();
  const { sidebar, orientation, isMobile } = theme;
  const isHorizontal = orientation === "horizontal" && !isMobile;
  const isFolded = sidebar === "folded";

  useEffect(() => {
    getToggleMenu && getToggleMenu(false);
  }, [pathname]);

  const navlinks = useMemo(() => {
    return [
      {
        name: "Menu",
        subLinks: [
          {
            id: "discover",
            name: "Discover",
            to: "/discover",
            icon: "BiPlayCircle",
            tooltip: "hover"
          },
          {
            id: "browse",
            name: "Genres",
            to: "/browse",
            icon: "RiListIndefinite",
            tooltip: "hover"
          },
          {
            id: "search",
            name: "Search",
            to: "/search",
            icon: "FaSearchengin",
            refFocus: searchRef,
            tooltip: "hover"
          },
          
          {
            id: "search",
            name: "Premium",
            to: "/premium",
            icon: "RiListIndefinite",        
            tooltip: "hover"
          },
          {
            id: "search",
            name: "About",
            to: "/about",
            icon: "RiListIndefinite",
            tooltip: "hover"
          }
        ]
      }
      // Additional navlinks can be added here
    ];
  }, [user]);

  const hideTooltip = (hideFunc) => {
    setToggleNav(false);
    if (hideFunc) hideFunc();
  };

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section
      className={classNames(
        "sidebar_section z-[1100] fixed top-0",
        isMobile &&
          classNames(
            "transition-all duration-500",
            toggleMenu && !isHorizontal ? "left-0" : "-left-sidebar"
          ),
        isHorizontal
          ? "top-navbar sidebar_horizontal_width bg-sidebar-0 shadow-dialog"
          : "h-full"
      )}
    >
      <Overlay isOpen={toggleMenu} handleIsOpen={getToggleMenu} />

      <div
        {...(!isHorizontal && {
          onMouseOver: () => setToggleNav(true),
          onMouseOut: () => setToggleNav(false),
        })}
        {...(toggleNav &&
          !isHorizontal && { style: { width: `${hoverWidth}px` } })}
        className={classNames(
          "nav-list overflow-auto hide_scrollbar relative",
          isHorizontal
            ? "h-navbar bg-card-skeleton"
            : "top-navbar sidebar_height w-sidebar duration-500 transition-all pb-[100px] bg-sidebar"
        )}
      >
        <div
          className={classNames(
            "relative text-white text-base",
            isHorizontal && "flex h-full border-t border-divider"
          )}
        >
          {(
            <>
              {navlinks.map((item) => (
                <div
                  key={item.name}
                  className={classNames("mt-4", isHorizontal && "flex gap-3")}
                >
                  {((!isFolded && !isHorizontal) || toggleNav) && (
                    <span
                      className={classNames(
                        "block p-3 mx-3 text-gray-400 text-sm uppercase"
                      )}
                    >
                      {item.name}
                    </span>
                  )}

                  <ul className={classNames(isHorizontal && "flex")}>
                    {item.subLinks.map((link) => (
                      <Fragment key={link.name}>
                        <li
                          className={classNames(
                            `dropdown_${link.id}`,
                            "relative px-[10px] group",
                            isHorizontal && "flex_justify_center"
                          )}
                        >
                          <Tooltip
                            id={link.id}
                            tooltipType={link.tooltip}
                            arrowPos={link?.arrowPos}
                            arrowClassName={link?.arrowClassName}
                            TooltipComp={link?.tooltipContent}
                            disabled={link.tooltip === "hover"}
                            hideTooltipFunc={hideTooltip}
                          >
                            <button
                              onClick={() => {
                                if (link?.onClick) {
                                  link?.onClick();
                                } else if (link?.dialog) {
                                  return null;
                                } else if (link?.refFocus) {
                                  link?.refFocus?.current?.focus();
                                  getToggleSearch(true);
                                } else {
                                  router.push(link.to);
                                }
                                modalClose();
                              }}
                              className={classNames(
                                "flex flex-row items-center gap-2 h-12 w-full outline-0 border-none",
                                isHorizontal ? "items-center p-3" : "pl-[20px]",
                                pathname.includes(link.to) &&
                                  "rounded bg-primary-opacity"
                              )}
                            >
                              <Icon
                                name={link.icon}
                                className={classNames(
                                  "group-hover:!text-primary",
                                  pathname.includes(link.to) && "!text-primary"
                                )}
                                size={20}
                              />

                              <div
                                className={classNames(
                                  "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                                  pathname.includes(link.to)
                                    ? "text-primary"
                                    : "text-onNeutralBg",
                                  !(isFolded && !isHorizontal && !isMobile) ||
                                    toggleNav
                                    ? "opacity-100 transition-opacity duration-1000"
                                    : "invisible w-0 opacity-0"
                                )}
                              >
                                {link.name}
                                {link.badgeCount && (
                                  <div className="flex items-center justify-center w-4 h-4 rounded-full right-2 bg-primary animate-bounce group-hover:bg-white">
                                    <span className="text-xs text-white group-hover:text-primary">
                                      {3}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </button>
                          </Tooltip>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
          { isMobile && (
            <div className="fixed bottom-0 p-2 bg-sidebar w-sidebar max-h-[100px]">
              {/* Additional mobile content */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
