const INTERVAL = 1000;

function registerDelayedClick(elm) {
    if (elm) {
        let delayedClick;
        const onMouseEnter = (e) => {
            delayedClick = setTimeout(() => {
                e?.target.click();
                onMouseEnter();
            }, INTERVAL);
        }
        const onMouseLeave = () => {
            clearInterval(delayedClick);
        }

        elm.addEventListener('mouseenter', onMouseEnter);
        elm.addEventListener('mouseleave', onMouseLeave);

        return () => {
            elm.removeEventListener('mouseenter', onMouseEnter);
            elm.removeEventListener('mouseleave', onMouseLeave);
            onMouseLeave();
        }
    }
}

function registerButtons(unRegister) {
    if (unRegister) {
        unRegister();
    }
    const ur1 = registerDelayedClick(document.querySelector('div._aaqg._aaqh button'));
    const ur2 = registerDelayedClick(document.querySelector('div._aaqf._aaqh button'));
    return () => {
        if (ur1) {
            ur1();
        }
        if (ur2) {
            ur2();
        }
    }
}

(function () {
    const rs = history.replaceState;
    const ps = history.pushState;
    let unRegister;
    history.replaceState = function () {
        rs.apply(history, arguments); // preserve normal functionality
        unRegister = registerButtons(unRegister);
    };
    history.pushState = function () {
        ps.apply(history, arguments); // preserve normal functionality
        unRegister = registerButtons(unRegister);
    };
}());


let presses = false;
document.onkeydown = (e) => {

    if(!presses) {
        const ev = e || window.event;
        if (ev.keyCode === 37) {
            const l = document.querySelector('div._aaqf._aaqh button');
            if (l) {
                l.click();
            }
        } else if (ev.keyCode === 39) {
            const r = document.querySelector('div._aaqg._aaqh button');
            if (r) {
                r.click();
            }
        }
    }
    presses = true;
};
document.onkeyup = (e) => {
    presses = false;
};
