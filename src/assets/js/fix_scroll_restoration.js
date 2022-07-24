if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; //bypass scroll restoration, which Chrome does wrong due to the scrollpill
}

const serializePathname = function(pathname) {
    return pathname.replace(/\//g, '_');
}

// on page hide, save scroll position along with current URL
window.addEventListener('pagehide', function (){
    const pathname = window.location.pathname;
    const serializedPathname = serializePathname(pathname);
    const scrollPosition = window.scrollY;
    sessionStorage.setItem(serializedPathname+"_savedScrollPosition", scrollPosition);
});

//if scroll position is saved, restore it
window.addEventListener('pageshow', function (){
    const pathname = window.location.pathname;
    const serializedPathname = serializePathname(pathname);
    const scrollPosition = sessionStorage.getItem(serializedPathname+"_savedScrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }
});