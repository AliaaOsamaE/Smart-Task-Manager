import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// Import Pages
import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Signup } from './Pages/signup/signup';
import { Layout } from './Pages/layout/layout';
import { NotFound } from './Pages/notfound/notfound';

// Import Components
import { TaskInput } from './Components/task-input/task-input';
import { TaskList } from './Components/task-list/task-list';
import { AllTasks } from './Components/all-tasks/all-tasks';
import { Done } from './Components/done/done';
import { NotDone } from './Components/not-done/not-done';

/**
 * Application Routes Configuration
 * 
 * Route Structure:
 * - / → Redirects to /layout/home
 * - /login → Login page (public)
 * - /signup → Signup page (public)
 * - /layout → Layout wrapper with child routes
 *   - /layout/home → Home page (public)
 *   - /layout/add-task → Add task page (protected)
 *   - /layout/all-tasks → Task list page (protected) with child routes:
 *     - /layout/all-tasks/all → All tasks tab
 *     - /layout/all-tasks/done → Done tasks tab
 *     - /layout/all-tasks/not-done → Not done tasks tab
 * - ** → 404 Not Found page
 */
export const routes: Routes = [
  // Root redirect to home
  {
    path: '',
    redirectTo: '/layout/home',
    pathMatch: 'full'
  },

  // Public routes (no auth required)
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },

  // Layout routes (with header and footer)
  {
    path: 'layout',
    component: Layout,
    children: [
      // Home page (public)
      {
        path: 'home',
        component: Home
      },

      // Add task page (protected)
      {
        path: 'add-task',
        component: TaskInput,
        canActivate: [authGuard]
      },

      // Task list page (protected) with nested tabs
      {
        path: 'all-tasks',
        component: TaskList,
        canActivate: [authGuard],
        children: [
          // Redirect to 'all' tab by default
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full'
          },
          // All tasks tab
          {
            path: 'all',
            component: AllTasks
          },
          // Done tasks tab
          {
            path: 'done',
            component: Done
          },
          // Not done tasks tab
          {
            path: 'not-done',
            component: NotDone
          }
        ]
      }
    ]
  },

  // 404 Not Found (wildcard route - must be last)
  {
    path: '**',
    component: NotFound
  }
];

// Made with Bob
