export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-zinc-800
        mt-20
        py-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎬</span>

          <h3 className="text-3xl font-bold">Movie</h3>
        </div>

        <p className="text-zinc-500">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
