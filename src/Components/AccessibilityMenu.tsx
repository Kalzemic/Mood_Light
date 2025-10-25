import { useState, useEffect, useRef } from "react";
import "./accessibility.css"

export default function AccessibilityMenu() {
    const [open, setOpen] = useState(false);
    const [prefs, setPrefs] = useState({
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        underlineLinks: false,
    });

    const panelRef = useRef<HTMLDivElement>(null);

    // Load saved preferences
    useEffect(() => {
        const saved = localStorage.getItem("accessibilityPrefs");
        if (saved) setPrefs(JSON.parse(saved));
    }, []);

    // Apply preferences to <body> classes
    useEffect(() => {
        for (const key in prefs) {
            document.body.classList.toggle(key, (prefs as any)[key]);
        }
        localStorage.setItem("accessibilityPrefs", JSON.stringify(prefs));
    }, [prefs]);

    // Close menu when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const togglePref = (key: keyof typeof prefs) =>
        setPrefs({ ...prefs, [key]: !prefs[key] });

    return (
        <div className="accessibility-container" ref={panelRef}>


            <div className={`accessibility-panel ${open ? "open" : ""}`}>
                <h3>Accessibility</h3>
                <div className="options">
                    <label>
                        <input
                            type="checkbox"
                            checked={prefs.highContrast}
                            onChange={() => togglePref("highContrast")}
                        />
                        High contrast
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={prefs.largeText}
                            onChange={() => togglePref("largeText")}
                        />
                        Larger text
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={prefs.reducedMotion}
                            onChange={() => togglePref("reducedMotion")}
                        />
                        Reduced motion
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={prefs.underlineLinks}
                            onChange={() => togglePref("underlineLinks")}
                        />
                        Underline links
                    </label>
                </div>
            </div>
            <button
                className="accessibility-toggle"
                aria-label="Accessibility options"
                onClick={() => setOpen(!open)}
            >
                <img src='/accessiblity.png' alt="Accessibility icon" />
            </button>
        </div>
    );
}
