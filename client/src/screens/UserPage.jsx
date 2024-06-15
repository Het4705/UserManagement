import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import UserCard2 from '../components/UserCard2';
import axios from 'axios';

function UserPage() {
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get('firstName'); // Get the firstName from the query params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!firstName) {
        setError('No first name provided');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://usermanagement-jmlw.onrender.com/api/users?firstName=${firstName}`,
          { withCredentials: true }
        );
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]); // Assuming response.data is an array and you want the first match
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [firstName]);

  if (loading) {
    return <div className='text-2xl text-white' >Loading...</div>;
  }

  if (error) {
    return <div className='text-2xl text-white'>{error}</div>;
  }

  if (!user) {
    return <div className='text-2xl text-white'>User not found</div>;
  }

  return <UserCard2 user={user} />;
}

export default UserPage;
