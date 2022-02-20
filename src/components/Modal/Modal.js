import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const secondRoot = document.querySelector('#second-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
      return createPortal(
        
          <div className={s.Overlay} onClick={this.handleBackdropClick}>
  <div className={s.Modal}>{this.props.children}</div>,
          </div>,
          secondRoot
                       
    );
  }
}
export default Modal;