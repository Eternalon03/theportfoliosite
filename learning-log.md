The only way to learn is to make mistakes. Here are the many lessons I learned, summarized by whatever AI I happened to be using that day:

2026-03-29

1. The Geometry of clip-path

    Percentage Pitfalls: Using pure percentages for cutouts (like 70%) causes the shape to stretch infinitely on wide screens.

    The calc() Fix: To "lock" a shape, you use calc(100% - 200px) to keep a cutout a consistent size regardless of the card's width.

    The min() Clamp: You can make shapes "proportional but limited" by using calc(100% - min(25%, 300px)).

2. The Physics of Layering (Stacking Context)

    absolute vs relative: Switching to relative to make a card "fit content" breaks overlapping layers.

    The Grid Sandwich: Using display: grid with grid-area: 1 / 1 is the "pro move" to make multiple clipped layers (background, glass, content) overlap perfectly while still allowing the height to be dynamic.

    The Filter Trap: Applying filter: drop-shadow creates a new stacking context that can hide elements or trap buttons behind invisible layers.

3. Interactive CSS & Buttons

    Z-Index & Clickability: Setting a negative z-index on a button makes it a "ghost"—you can see it, but you can't click it because it’s behind the background.

    The Browser "Grey" Shadow: HTML buttons have a default 3D border that ruins aesthetics; you must explicitly set border: none and outline: none.

    Drop-Shadow vs Box-Shadow: box-shadow only follows the rectangular box; filter: drop-shadow() is the only way to make a glow follow a clip-path silhouette.

4. Background Windowing

    The "One Gradient" Illusion: You can make multiple buttons look like they share one giant glow by using a background-size of 400% and shifting the background-position for each child.
    (used in the tabs of the skills section)

    The "Trailing Comma" Bug: A single extra comma at the end of a linear-gradient list will invalidate the entire CSS rule, causing the background to disappear.

5. React & Data Logic

    Short-Circuit Rendering: Using {condition && <Component />} is the standard way to toggle tab content.

    The <span> Nesting Error: You cannot put a <div> or an <h5> inside a <span>. It breaks the HTML spec and causes weird layout shifts.

    Data Transformation: To turn a flat list of skills into a categorized UI, you use .reduce() to group them by type before mapping them to the screen.

6. Responsive Scaling

    clamp(): Instead of fixed pixel sizes, using clamp(min, preferred, max) allows your fonts, padding, and even your clip-path slopes to scale perfectly from a phone to a desktop.

    Inverse Proportionality: To make things get smaller as the screen gets wider, you use subtraction-based math: calc(100px - 2vw).

7. useMemory

    useMemo takes two things:
        A Function: The expensive calculation
        A Dependency Array: A list of variables that, if changed, should trigger a re-calculation ([skillsData, activeTab]).


8. I don't know what to call this

    As always, if there's a CSS problem it seems that instead of failing loudly, next.js will just stop updating live updating with the changes I make while running npm run dev. I should figure out if there's a better setup for this