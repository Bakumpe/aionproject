import { useState, useEffect } from 'react';

const useResponsivePropertiesPerPage = () => {
  const [propertiesPerPage, setPropertiesPerPage] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setPropertiesPerPage(2);
      } else {
        setPropertiesPerPage(6);
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
