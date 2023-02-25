import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>{user ? 'LOGGED IN' : 'NOT LOGGED IN'}</div>
    </>
  );
}
