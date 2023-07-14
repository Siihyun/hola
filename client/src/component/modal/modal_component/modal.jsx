import styled from 'styled-components';
import Portal from '../portal/portal';

const Modal = ({ name, onClose, visible, children }) => {
  const onMaskClick = (e) => {
    if (onClose === undefined) return;
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <Portal elementId='modal-root'>
      <ModalOverlay name={name} visible={visible} onClick={onMaskClick}>
        <ModalWrapper tabIndex={-1} visible={visible}>
          {children}
        </ModalWrapper>
      </ModalOverlay>
    </Portal>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: ${(props) => (props.name === 'loading' ? 'white' : 'rgba(77, 77, 77, 0.5)')};
  z-index: 999;
`;

export default Modal;
