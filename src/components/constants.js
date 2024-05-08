import toast from 'react-hot-toast';

export const CONSTANTS = {
  modalStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  activeLink: activeNavLink,
  notifySuccess: () => toast('Operation is successful'),
};

function activeNavLink({ isActive }) {
  return isActive ? { color: 'red', fontWeight: 'bold' } : {};
}
