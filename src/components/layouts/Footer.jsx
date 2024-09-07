import Link from 'next/link';




const pageLink = [
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Legal", link: "/legal" },
  { name: "Policy", link: "/policy" },
];

export default function Footer() {
  return (
    <div className="footer">
      <div className="py-4 border-t border-divider">
       
        
        <div className="footer_links">
          <div className="flex gap-2 mt-4">
            {pageLink.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-2 footer_copyright">
          <p className="text-xs text-secondary">© Copyright {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
