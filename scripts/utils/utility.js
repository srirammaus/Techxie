function Redirect(URL) {
    window.location.href = URL.toString();
}
function RedirectIfr (Ifr,URL) { 
     //ifr - iframe-doc elem
     Ifr.src = URL.toString();
}
