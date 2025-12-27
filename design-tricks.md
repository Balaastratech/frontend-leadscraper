# UI & UX Design Tricks for AI LeadGen SaaS

1. Progressive disclosure: Hide advanced filters and enrichment options behind accordions.
2. Skeleton screens: Use shimmer loaders for tables, cards, and detail views.
3. Optimistic UI: Update lead owner and stage before server response, roll back on error.
4. Debounced search: 300ms debounce for lists, search bars, and filters.
5. Virtualized tables: Replace basic tables with react-window when dataset exceeds 500 rows.
6. Keyboard shortcuts: "/" to focus search, "n" to create lead, Ctrl/Cmd+K for command menu.
7. Accessible color contrast: Maintain WCAG AAA ratios for key text.
8. Dynamic server-side pagination: Provide hooks to swap from mock to backend pagination.
9. Client-side caching: Cache lists in Redux, refetch only on invalidation.
10. Toast undo: Use 5s undo window for delete/merge destructive actions.
11. Command menu: Show global actions and navigation, triggered by Ctrl/Cmd+K.
12. Motion micro-interactions: 120–200ms scale or opacity transitions.
13. Zero-empty states: Provide templates and quick actions to avoid blank screens.
14. Smart defaults: Pre-fill new lead forms using common patterns.
15. Viewport typography: Scale headline size on screens wider than 1280px.
16. Focus rings: Ensure outlines are visible using :focus-visible patterns.
17. Sticky headers: Keep list filters and table headers pinned.
18. Hot zones: Place key actions top-right or near cursor-heavy zones.
19. Soft gradients + glass panels: Use subtle background layers to separate sections.
20. AI plug points: Summary boxes, enrichment suggestions, scoring hints, clustering insights.
