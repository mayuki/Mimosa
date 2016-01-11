/*! Mimosa | https://github.com/mayuki/Mimosa | Mayuki Sawatari | MIT License */
var Mimosa = (function () {
    function Mimosa() {
    }
    
    Mimosa.initialized = false;
    Mimosa.isMonacoReady = false;
    
    Mimosa.settings = {
        /** Apply syntax highlight on page is loaded */
        colorizeOnLoad: true,
        defaultTargetSelector: 'pre.vs[data-lang]',
    };
    
    /**
     * Initialize Mimosa & Monaco Editor
     */
    Mimosa.initialize = function () {
        if (Mimosa.initialized) return;
        
        require(["vs/editor/editor.main"], function () {
            require(["vs/editor/common/modes/abstractMode"], function () {
                Mimosa.isMonacoReady = true;
                
                if (Mimosa.settings.colorizeOnLoad) {
                    var elements = document.querySelectorAll(Mimosa.settings.defaultTargetSelector);
                    for (var i = 0; i < elements.length; i++) {
                        Mimosa.colorizeElement(elements[i]);
                    }
                }
            });
        });
        
        Mimosa.initialized = true;
    };
    
    /**
     * Colorize (syntax highlight) code by language.
     * 
     * @param text {string} a source code
     * @param targetMode {string} a code language 
     */
    Mimosa.colorize = function (text, targetMode) {
        return new Promise(function (resolve) {
            function colorizeCore() {
                if (Mimosa.isMonacoReady) {
                    Monaco.Editor.getOrCreateMode(targetMode).then(function (mode) {
                        if (mode.tokenizationSupport) {
                            Monaco.Editor.colorize(text, targetMode).then(function (x) {
                                resolve(x);
                            });
                        } else {
                            mode.addSupportChangedListener(function (e) {
                                if (e.tokenizationSupport) {
                                    Monaco.Editor.colorize(text, targetMode).then(function (x) {
                                        resolve(x);
                                    });
                                }
                            });
                        }
                    });
                } else {
                    // wait for Monaco Editor
                    setTimeout(colorizeCore, 150);
                }
            }
            colorizeCore();
        });
    };
    
    /**
     * Colorize (syntax highlight) code in element.
     * 
     * @param target {HTMLElement} a source code
     */
    Mimosa.colorizeElement = function (target) {
        var targetMode = target.getAttribute('data-lang') || 'plaintext';
        Mimosa.colorize(target.textContent, targetMode).then(function (x) {
            target.innerHTML = x;
        })
    };

    /**
     * Is Monaco Editor loaded or not.
     */    
    Mimosa.isMonacoReady = false;
    
    return Mimosa;
})();
window.Mimosa = Mimosa;
