import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";

import Marketplace from "./pages/Marketplace";
import ItemDetails from "./pages/ItemDetails";
import CreateItem from "./pages/CreateItem";
import MyItems from "./pages/MyItems";

import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import UploadNote from "./pages/UploadNote";
import MyNotes from "./pages/MyNotes";

import PYQs from "./pages/PYQs";
import PYQDetails from "./pages/PYQDetails";
import UploadPYQ from "./pages/UploadPYQ";
import MyPYQs from "./pages/MyPYQs";

import Chat from "./pages/Chat";
import MyChats from "./pages/MyChats";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route
          path="/items/:itemId"
          element={<ItemDetails />}
        />

        <Route path="/notes" element={<Notes />} />

        <Route
          path="/notes/:noteId"
          element={<NoteDetails />}
        />

        <Route path="/pyqs" element={<PYQs />} />

        <Route
          path="/pyqs/:pyqId"
          element={<PYQDetails />}
        />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-item"
          element={
            <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-items"
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-note"
          element={
            <ProtectedRoute>
              <UploadNote />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-notes"
          element={
            <ProtectedRoute>
              <MyNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-pyq"
          element={
            <ProtectedRoute>
              <UploadPYQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-pyqs"
          element={
            <ProtectedRoute>
              <MyPYQs />
            </ProtectedRoute>
          }
        />
        <Route
  path="/chat/:itemId/:otherUserId"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-chats"
  element={
    <ProtectedRoute>
      <MyChats />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;