import { useState, useEffect } from 'react';

const useResponsivePropertiesPerPage = () => {
  const [propertiesPerPage, setPropertiesPerPage] = useState();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 500) {
        setPropertiesPerPage(1);
      } else if (width <= 768) {
        setPropertiesPerPage(2);
      } else if (width <= 2000) {
        setPropertiesPerPage(3);
      } else {
        setPropertiesPerPage(6); // For width > 2000px
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return propertiesPerPage;
};

export default useResponsivePropertiesPerPage;