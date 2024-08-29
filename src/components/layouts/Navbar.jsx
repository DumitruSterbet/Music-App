import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import { isEmpty } from "lodash";

import { classNames, getTimeOfDay } from "../../lib/utils";
import { useAppUtil, useCurrentUser } from "../../lib/store";
import { useTheme } from "../../hooks";

import { Button, Icon, DropdownMenu, Overlay } from "../../components";
import { defaultThemeConfig } from "../../configs";
import { logo } from "../../constants";
import Link from 'next/link';

const Searchbar = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const ref = useRef();

  const { getSearchRef } = useAppUtil();
  const { getToggleSearch, toggleSearch } = useAppUtil();
  const [theme] = useTheme();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setInput(query);
    }
    if (!router.pathname.includes("/search")) {
      setInput("");
    }
  }, [router.pathname]);

  useEffect(() => {
    getSearchRef(ref);
  }, [ref]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isEmpty(input.trim()) && input.trim().length >= 3) {
        const path = router.pathname;

        if (path === "/search") {
          router.push({ pathname: path, query: { q: input } });
        } else {
          router.push({ pathname: "/search", query: { q: input } });
        }
      }
    }
  };

  return (
    <>
      <div
        className={classNames(
          "w-full h-full",
          theme?.isMobile
            ? classNames(
                "absolute p-3 duration-300 transition-all left-0",
                toggleSearch ? "top-0 bg-card" : "-top-navbar"
              )
            : "flex items-center"
        )}
      >
        <div
          className={classNames(
            "flex_justify_between h-full w-full",
            theme?.isMobile &&
              "border border-divider hover:border-onNeutralBg rounded bg-main px-3 duration-500"
          )}
        >
          {theme?.isMobile && <Icon name="BiSearch" />}
          <input
            placeholder="Search songs, albums ..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent rounded outline-0 text-onNeutralBg border-onNeutralBg focus:bg-card"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            ref={ref}
          />
          {theme?.isMobile && (
            <button
              className="w-8 h-8 transition-colors duration-500 rounded flex_justify_center bg-sidebar hover:bg-red-500"
              onClick={() => getToggleSearch(false)}
            >
              <Icon name="MdCancel" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
          onClick={() => getToggleSearch(true)}
        >
          <Icon name="BiSearch" className="group-hover:!text-white" />
        </button>
      </div>
    </>
  );
};

const MobileToggleButton = () => {
  const { getToggleMenu, toggleMenu } = useAppUtil();

  return (
    <div className="flex items-center h-full lg:hidden">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => getToggleMenu(!toggleMenu)}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};

const DesktopToggleButton = () => {
  const [theme, setTheme] = useTheme();

  const changeTheme = (value) => {
    setTheme({ ...theme, ...value });
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};

const Logo = ({ isFolded, isHorizontal }) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const showFull = Boolean(isFolded && !isHorizontal && isMobile);

  return (
    <div
      className={classNames(
        "relative p-3 z-20 h-navbar duration-500",
        !isHorizontal && "w-sidebar",
        showFull ? "bg-primary" : "lg:bg-sidebar"
      )}
    >
      <Link href="/" className="flex items-center h-full gap-2 logo w-fit">
        <div
          className={
            showFull
              ? "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              : ""
          }
        >
          <Icon
            name={logo.icon}
            size={25}
            className={showFull ? "!text-white" : "!text-primary"}
          />
        </div>

        <h1
          className={classNames(
            "text-[20px] text-primary font-bold duration-1000 transition-opacity",
            showFull ? "invisible w-0 opacity-0" : "opacity-100"
          )}
        >
          {logo.name}
        </h1>
      </Link>
    </div>
  );
};

export default function Navbar() {
  const { getToggleSearch, toggleSearch } = useAppUtil();
  const [theme] = useTheme();

  const { currentUser } = useCurrentUser();

  const { orientation, sidebar, isMobile } = theme || defaultThemeConfig;
  const isHorizontal = orientation === "horizontal" && !isMobile;
  const isFolded = sidebar === "folded";

  const { isLoaded, user } = currentUser || {};

  return (
    <nav className="fixed z-[1200] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px] sidebar_horizontal_width">
      <Overlay isOpen={toggleSearch} handleIsOpen={getToggleSearch} />
      <div className="absolute w-full h-full transition-all duration-300" />

      <div
        className={classNames(
          "relative flex h-full items-center justify-between",
          isHorizontal && "bg-sidebar"
        )}
      >
        <Logo isFolded={isFolded} isHorizontal={isHorizontal} />
        <div className="flex items-center gap-4 px-3 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            {!isHorizontal && <DesktopToggleButton />}
            <Searchbar />
            <MobileToggleButton />
          </div>

        </div>
      </div>
    </nav>
  );
}
