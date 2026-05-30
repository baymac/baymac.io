import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Modal from '../../../components/Modal/Modal';

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  document.body.innerHTML = '';
  const appRoot = document.createElement('div');
  appRoot.id = 'app-root';
  document.body.appendChild(appRoot);

  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => {
    root?.unmount();
  });
  document.body.innerHTML = '';
});

async function render(ui: React.ReactNode) {
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
}

describe('Modal', () => {
  it('renders nothing when closed', async () => {
    const handleClose = mock();
    await render(
      <Modal open={false} handleClose={handleClose}>
        <h2 id="modal-title">title</h2>
      </Modal>
    );
    const modalRoot = document.getElementById('modal-root');
    expect(modalRoot?.children.length).toBe(0);
  });

  it('renders with role=dialog, aria-modal, aria-labelledby when open', async () => {
    const handleClose = mock();
    await render(
      <Modal open={true} handleClose={handleClose}>
        <h2 id="modal-title">Buy Me Crypto</h2>
      </Modal>
    );
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('modal-title');
  });

  it('calls handleClose when close button clicked', async () => {
    const handleClose = mock();
    await render(
      <Modal open={true} handleClose={handleClose}>
        <h2 id="modal-title">x</h2>
      </Modal>
    );
    const closeBtn = document.querySelector('button[type="button"]');
    expect(closeBtn).not.toBeNull();
    await act(async () => {
      (closeBtn as HTMLButtonElement).click();
    });
    expect(handleClose).toHaveBeenCalled();
  });
});
