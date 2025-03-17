//this script bypasses and reimplements scroll restoration, which Chrome does wrong due to the scrollpill

history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const serializePathname = function(pathname) {
    return pathname.replace(/\//g, '_');
}

const saveScrollPos = () => {
    const pathname = window.location.pathname;
    const serializedPathname = serializePathname(pathname);
    const scrollPosition = window.scrollY;
    sessionStorage.setItem(serializedPathname+"_savedScrollPosition", scrollPosition);
}

const restoreScrollPos = () => {
    const pathname = window.location.pathname;
    const serializedPathname = serializePathname(pathname);
    const scrollPosition = sessionStorage.getItem(serializedPathname + "_savedScrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }
    sessionStorage.removeItem(serializedPathname + "_savedScrollPosition");
}

// on page hide, save scroll position along with current URL
window.addEventListener('pagehide', saveScrollPos);

// //if scroll position is saved, restore it
window.addEventListener('pageshow', restoreScrollPos);