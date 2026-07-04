
export function Footer() {
  return (
    <footer className=" sticky z-10 bg-bg w-full text-white py-12 px-6 ">
      <div className="flex  justify-around items-center gap-4">
        <a href="mailto:siteup.am@gmail.com">siteup.am@gmail.com</a> | <a href="tel:+37477760204">+374 77 760 204</a>
      </div>

      <div className="border-t  mt-5 pt-5 text-center text-sm">
        © {new Date().getFullYear()} All rights reserved • Created by{" "}
        <span className=" font-semibold">SiteUp</span>
      </div>
    </footer>
  );
}
