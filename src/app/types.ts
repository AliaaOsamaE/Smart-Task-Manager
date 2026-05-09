export interface Task {
  id: string;
  title: string;
  desc: string;
  priority: string;
  date: string;
  category: string;
  state: 'Done' | 'NotDone';
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
