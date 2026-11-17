import { Link, Outlet } from 'react-router'

/** Shared header for every app page (not used by the public landing page). */
export default function AppLayout() {
  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-5xl items-center px-4 sm:px-6">
          <Link to="/" className="flex min-h-12 items-center font-serif text-xl font-bold text-ink">
            <span aria-hidden="true">🔀&nbsp;</span>Plot Twist
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  )
}
