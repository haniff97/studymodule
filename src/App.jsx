import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LangProvider } from './context/LangContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Admin from './pages/Admin.jsx'
import Home from './pages/Home.jsx'
import NotesHub from './pages/NotesHub.jsx'
import Exam from './pages/Exam.jsx'
import ArcadeLobby from './pages/ArcadeLobby.jsx'
import Arcade from './pages/Arcade.jsx'
import Tips from './pages/Tips.jsx'
import Profile from './pages/Profile.jsx'
import Assignments from './pages/Assignments.jsx'
import { RequireAuth } from './components/RequireAuth.jsx'
import {
  TopicNotes1103,
  TopicNotes1203,
  TopicNotes2303,
  TopicNotes1303,
  TopicNotes5103,
  TopicNotes5533,
} from './pages/TopicNotes.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <BrowserRouter>

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup.html" element={<Signup />} />
            <Route path="/admin-login.html" element={<AdminLogin />} />
            <Route path="/admin.html" element={<Admin />} />

            <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/notes-hub.html" element={<RequireAuth><NotesHub /></RequireAuth>} />
            <Route path="/notes-hpgd1103.html" element={<RequireAuth><TopicNotes1103 /></RequireAuth>} />
            <Route path="/notes-hpgd1103.html/:topicId" element={<RequireAuth><TopicNotes1103 /></RequireAuth>} />
            <Route path="/notes-hpgd1203.html" element={<RequireAuth><TopicNotes1203 /></RequireAuth>} />
            <Route path="/notes-hpgd1203.html/:topicId" element={<RequireAuth><TopicNotes1203 /></RequireAuth>} />
            <Route path="/notes-hpgd2303.html" element={<RequireAuth><TopicNotes2303 /></RequireAuth>} />
            <Route path="/notes-hpgd2303.html/:topicId" element={<RequireAuth><TopicNotes2303 /></RequireAuth>} />
            <Route path="/notes-hpgd1303.html" element={<RequireAuth><TopicNotes1303 /></RequireAuth>} />
            <Route path="/notes-hpgd1303.html/:topicId" element={<RequireAuth><TopicNotes1303 /></RequireAuth>} />
            <Route path="/notes-hmml5103.html" element={<RequireAuth><TopicNotes5103 /></RequireAuth>} />
            <Route path="/notes-hmml5103.html/:topicId" element={<RequireAuth><TopicNotes5103 /></RequireAuth>} />
            <Route path="/notes-hmml5533.html" element={<RequireAuth><TopicNotes5533 /></RequireAuth>} />
            <Route path="/notes-hmml5533.html/:topicId" element={<RequireAuth><TopicNotes5533 /></RequireAuth>} />
            <Route path="/Study_hub_exam_full.html" element={<RequireAuth><Exam /></RequireAuth>} />
            <Route path="/arcade-lobby.html" element={<RequireAuth><ArcadeLobby /></RequireAuth>} />
            <Route path="/arcade.html" element={<RequireAuth><Arcade /></RequireAuth>} />
            <Route path="/assignments.html" element={<RequireAuth><Assignments /></RequireAuth>} />
            <Route path="/assignments" element={<RequireAuth><Assignments /></RequireAuth>} />
            <Route path="/tips.html" element={<RequireAuth><Tips /></RequireAuth>} />
            <Route path="/profile.html" element={<RequireAuth><Profile /></RequireAuth>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  </ThemeProvider>
  )
}

