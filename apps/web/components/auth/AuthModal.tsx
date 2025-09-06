import LoginDialog from './LoginDialog';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  return <LoginDialog open onClose={onClose} />;
}

