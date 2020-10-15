

import ScheduleScreen from './Src/Screen/Tasks/Schedule'
import TaskScreen from './Src/Screen/Tasks/Task'
import SplashScreen from './Src/Screen/Splash'
import ProjectsScreen from './Src/Screen/Projects/Projects'
import ProjectCreateScreen from './Src/Screen/Projects/ProjectCreate'
import ProjectCreationScreen from './Src/Screen/Projects/ProjectCreation/ProjectCreation'
import ProjectEachScreen from './Src/Screen/Projects/ProjectEach'
import ProfileScreen from './Src/Screen/Profile'
import TryScreen from './Src/Screen/Try'
import MyTasksScreen from './Src/Screen/Tasks/MyTasks/MyTasks'
import TaskDetailScreen from './Src/Screen/Tasks/TaskDetail'
import TaskAddTeamScreen from './Src/Screen/Tasks/TaskAddTeam'
import TaskCheckScreen from './Src/Screen/Tasks/TaskCheck'
import SprintScreen from './Src/Screen/Sprints/Sprint'
import CreateSprintScreen from './Src/Screen/Sprints/CreateSprint'
import LoginScreen from './Src/Screen/Auth/Login'
import RegisterScreen from './Src/Screen/Auth/Register'
import Test from './Demo/Text'

export default routes = [
    {
        name:"SplashScreen",
        component:SplashScreen
    },
    {
        name:"ScheduleScreen",
        component:ScheduleScreen
    },
    {
        name:"TaskScreen",
        component:TaskScreen
    },
    {
        name:"LoginScreen",
        component:LoginScreen
    },
    {
        name:"RegisterScreen",
        component:RegisterScreen
    },
    {
        name:"MyTasksScreen",
        component:MyTasksScreen
    },
    {
        name:"TaskAddTeamScreen",
        component:TaskAddTeamScreen
    },
    {
        name:"TaskDetailScreen",
        component:TaskDetailScreen
    },
    {
        name:"TaskCheckScreen",
        component:TaskCheckScreen
    },
    {
        name:"ProjectsScreen",
        component:ProjectsScreen
    },
    {
        name:"ProjectCreateScreen",
        component:ProjectCreateScreen
    },
    {
        name:"ProjectCreationScreen",
        component:ProjectCreationScreen
    },
    {
        name:"ProjectEachScreen",
        component:ProjectEachScreen
    },
    {
        name:"ProfileScreen",
        component:ProfileScreen
    },
    {
        name:"SprintScreen",
        component:SprintScreen
    },
    {
        name:"CreateSprintScreen",
        component:CreateSprintScreen
    },
    {
        name:"TryScreen",
        component:TryScreen
    },
    {
        name:"Text",
        component:Test
    }
]
    
