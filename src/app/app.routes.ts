import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Signup } from './Pages/signup/signup';
import { Layout } from './Pages/layout/layout';
import { NotFound } from './Pages/notfound/notfound';

import { TaskInput } from './Components/task-input/task-input';
import { TaskList } from './Components/task-list/task-list';
import { AllTasks } from './Components/all-tasks/all-tasks';
import { Done } from './Components/done/done';
import { NotDone } from './Components/not-done/not-done';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/layout/home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },

      {
        path: 'add-task',
        component: TaskInput,
        canActivate: [authGuard]
      },

      {
        path: 'all-tasks',
        component: TaskList,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full'
          },
          {
            path: 'all',
            component: AllTasks
          },
          {
            path: 'done',
            component: Done
          },
          {
            path: 'not-done',
            component: NotDone
          }
        ]
      }
    ]
  },

  {
    path: '**',
    component: NotFound
  }
];

