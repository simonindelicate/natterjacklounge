import * as React from 'react';

interface PasswordInputProps {
  onPasswordChange: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange }) => {
  const [password, setPassword] = React.useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    onPasswordChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={password}
      onChange={handlePasswordChange}
    />
  );
};

export default PasswordInput;