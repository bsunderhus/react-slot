# react-sockets

## Slot Content and Outlet

In some cases, we may want to pass a template fragment to a child component, and let the child component render the fragment within its own template.

For example, we may have a `<Button>` component that supports usage like this:

```tsx
<Button>
  <Info24Regular /> {/* some icon */}
  More information
</Button>
```
