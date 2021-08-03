import { createPortal } from 'react-dom';

const PortalToElement = (props) => {
  const { children, elementId, strict } = Object.assign(
    { elementId: undefined, strict: false },
    props
  );

  if (!elementId) {
    if (strict) return null;
    return children;
  }

  const htmlEl = document.getElementById(elementId);

  if (!htmlEl) {
    if (strict) return null;
    return children;
  }

  return createPortal(children, htmlEl);
};

export default PortalToElement;
