import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';

// Firebase
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Componentes
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import AuroraBackground from './components/Aurorabackground/AuroraBackground';
import Header from './components/Header/Header';
import NewsGrid from './components/NewsGrid/NewsGrid';
import NewsFormModal from './components/NewsFormModal/NewsFormModal';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  // --- ESTADOS PRINCIPALES ---
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);

  // --- LÓGICA DE CARGA ---
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);

  // --- ESTADOS PARA LOS MODALES ---
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [articleToDeleteId, setArticleToDeleteId] = useState(null);

  // --- EFECTOS (LIFECYCLE) ---
  useEffect(() => {
    const timer = setTimeout(() => setIsMinTimeElapsed(true), 3000);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecked(true);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthChecked && isMinTimeElapsed) {
      setIsLoading(false);
    }
  }, [isAuthChecked, isMinTimeElapsed]);

  useEffect(() => {
    if (!isAuthChecked) return;
    if (!user) {
      const demoNews = localStorage.getItem('demoNewsData');
      setNews(demoNews ? JSON.parse(demoNews) : []);
      return;
    }
    const newsCollectionPath = `users/${user.uid}/news`;
    const q = query(collection(db, newsCollectionPath), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [user, isAuthChecked]);

  // --- FUNCIONES CRUD ---
  const handleSaveNews = async (articleData) => {
    if (!user) {
      let updatedNews = news;
      if (articleToEdit) {
        updatedNews = news.map(n => n.id === articleToEdit.id ? { ...articleToEdit, ...articleData } : n);
      } else {
        updatedNews = [{ id: new Date().getTime().toString(), createdAt: new Date().toISOString(), ...articleData }, ...news];
      }
      setNews(updatedNews);
      localStorage.setItem('demoNewsData', JSON.stringify(updatedNews));
    } else {
      const newsCollectionPath = `users/${user.uid}/news`;
      if (articleToEdit) {
        await updateDoc(doc(db, newsCollectionPath, articleToEdit.id), articleData);
      } else {
        await addDoc(collection(db, newsCollectionPath), { ...articleData, createdAt: serverTimestamp() });
      }
    }
    closeFormModal();
  };

  const handleConfirmDelete = async () => {
    if (!articleToDeleteId) return;
    if (!user) {
      const updatedNews = news.filter(n => n.id !== articleToDeleteId);
      setNews(updatedNews);
      localStorage.setItem('demoNewsData', JSON.stringify(updatedNews));
    } else {
      const newsCollectionPath = `users/${user.uid}/news`;
      await deleteDoc(doc(db, newsCollectionPath, articleToDeleteId));
    }
    closeConfirmModal();
  };

  // --- FUNCIÓN DE ARRASTRAR Y SOLTAR ---
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const items = Array.from(news);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setNews(items);
    if (!user) {
      localStorage.setItem('demoNewsData', JSON.stringify(items));
    }
  };

  // --- ¡FUNCIONES AUXILIARES RESTAURADAS! ---
  const openFormModalToAdd = () => { setArticleToEdit(null); setIsFormModalOpen(true); };
  const openFormModalToEdit = (article) => { setArticleToEdit(article); setIsFormModalOpen(true); };
  const closeFormModal = () => setIsFormModalOpen(false);
  const handleRequestDelete = (articleId) => { setArticleToDeleteId(articleId); setIsConfirmModalOpen(true); };
  const closeConfirmModal = () => { setIsConfirmModalOpen(false); setArticleToDeleteId(null); };

  // --- RENDERIZADO ---

  if (isLoading) {
    return <LoadingScreen />;
  }

  // MODO PORTAFOLIO (si no hay usuario)
  if (!user) {
    return (
      <>
        <AuroraBackground />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="app-container">
            <Header clientName="Blog Deportivo | Modo Portafolio">
              <button className="btn btn-primary btn-sm" onClick={() => {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider).catch(console.error);
              }}>Iniciar Sesión</button>
            </Header>
            <main className="container my-5">
              <div className="text-center mb-5">
                <button className="btn btn-primary" onClick={openFormModalToAdd}>+ Añadir Nueva Noticia</button>
              </div>
              <p className="text-center text-secondary mb-4">Estás en modo demostración. Tus cambios se guardan localmente.</p>
              <NewsGrid news={news} onEdit={openFormModalToEdit} onDelete={handleRequestDelete} />
            </main>
            <Footer />
            <NewsFormModal show={isFormModalOpen} onHide={closeFormModal} onSave={handleSaveNews} articleToEdit={articleToEdit} />
            <ConfirmationModal show={isConfirmModalOpen} onClose={closeConfirmModal} onConfirm={handleConfirmDelete} />
          </div>
        </DragDropContext>
      </>
    );
  }

  // MODO ADMINISTRADOR (si hay usuario)
  return (
    <>
      <AuroraBackground />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="app-container">
          <Header clientName={`Blog de ${user.displayName}`}>
            <button className="btn btn-secondary btn-sm" onClick={() => signOut(auth)}>Cerrar Sesión</button>
          </Header>
          <main className="container my-5">
            <div className="text-center mb-5">
              <button className="btn btn-primary" onClick={openFormModalToAdd}>+ Añadir Nueva Noticia</button>
            </div>
            <NewsGrid news={news} onEdit={openFormModalToEdit} onDelete={handleRequestDelete} />
          </main>
          <Footer />
          <NewsFormModal show={isFormModalOpen} onHide={closeFormModal} onSave={handleSaveNews} articleToEdit={articleToEdit} />
          <ConfirmationModal show={isConfirmModalOpen} onClose={closeConfirmModal} onConfirm={handleConfirmDelete} />
        </div>
      </DragDropContext>
    </>
  );
}

export default App;