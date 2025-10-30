"use client";

function Header() {
  function onClk() {
    document?.getElementById("toc-content")?.classList?.toggle("open")
  }

  return (
    <>
      <header className="mb-2 hidden md:block">On this page</header>

      <button
        className="block md:hidden mb-2"
        onClick={onClk}
      >
        On this page
      </button>
    </>
  )
}

export default Header
