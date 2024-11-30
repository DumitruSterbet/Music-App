import React, { useEffect, useRef } from 'react';

const Premium = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "http://form.123formbuilder.com/embed/4855766.js";
    script.type = "text/javascript";
    script.defer = true;
    script.dataset.role = "form";
    script.dataset.defaultWidth = "800px";
    script.dataset.customVars = "hasEmbedFormStyle=1&hasTransparentBg=1";
    
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <h1>Premium</h1>
    </div>
  );
};

export default Premium;
