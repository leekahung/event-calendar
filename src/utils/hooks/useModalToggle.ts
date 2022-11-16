import { useState } from "react";

// Custom hook for toggling event modals
const useModalToggle = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventEditModal, setShowEventEditModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleEventModal = () => {
    setShowEventModal(!showEventModal);
  };

  const toggleEventEditModal = () => {
    setShowEventEditModal(!showEventEditModal);
  };

  return {
    modalState: {
      showModal,
      showEventModal,
      showEventEditModal,
    },
    modalDispatch: {
      toggleModal,
      toggleEventModal,
      toggleEventEditModal,
    },
  };
};

export default useModalToggle;
