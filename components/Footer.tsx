import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light text-center">
      <div className="container">
        <p className="text-muted m-0">Copyright &copy; Dev Events 2021</p>
        <Link href="/about">
          <a className="fs-6">About This Project</a>
        </Link>
      </div>
    </footer>
  );
};
