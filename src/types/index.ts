
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'Editor' | 'Jornalista' | 'Visitante';

export interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  form?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  status: string; 
  publishedAt?: string; 
  authorId: string;
  categoryId: string;
  tags: { id: string; name: string }[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  author?: { id: string; username: string }; 
  category?: { id: string; name: string }; 
}

export interface ArticleFormData {
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  categoryId: string;
  tags: string[];
  authorId?: string;
}

export interface ArticleFormErrors {
  title?: string;
  subtitle?: string;
  content?: string;
  coverImage?: string;
  categoryId?: string;
  tags?: string;
  form?: string;
}

export interface Category {
  id: string;
  name: string;
}

export type NewsCategory = 'futebol' | 'basquete' | 'tenis' | 'natacao' | 'atletismo' | 'outros';

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
  className?: string;
}
