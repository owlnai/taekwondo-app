import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type Profile = {
  name: string;
  license: string;
  email: string;
  password: string;
  avatar: string;
};

const DEFAULT_PROFILE_DATA: Profile = {
  name: 'Estela Martínez',
  license: '123456',
  email: 'example@example.com',
  password: '123456',
  avatar: '',
};

type AuthContextType = {
  profileData: Profile;
  setProfileData: React.Dispatch<React.SetStateAction<Profile>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [profileData, setProfileData] = useState<Profile>(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_DATA;
  });

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <AuthContext
      value={{
        profileData,
        setProfileData,
      }}
    >
      {children}
    </AuthContext>
  );
};
