import { useState, useEffect } from 'react';
import './NewsFormModal.css';

const NewsFormModal = ({ show, onHide, onSave, articleToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState('');

    useEffect(() => {
        if (show && articleToEdit) {
            setTitle(articleToEdit.title);
            setDescription(articleToEdit.description);
            setImage(articleToEdit.image || '');
            setCategories(articleToEdit.categories?.join(', ') || '');
        } else {
            setTitle('');
            setDescription('');
            setImage('');
            setCategories('');
        }
    }, [articleToEdit, show]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setImage(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("El título y la descripción son obligatorios.");
            return;
        }
        const categoriesArray = categories.split(',')
            .map(cat => cat.trim()) 
            .filter(cat => cat);  

        onSave({ title, description, image, categories: categoriesArray });
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onHide}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{articleToEdit ? 'Editar Noticia' : 'Añadir Nueva Noticia'}</h5>
                    <button type="button" className="btn-close" onClick={onHide}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} id="news-form">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea className="form-control" id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categories" className="form-label">Categorías (Usar comas para separar categorias)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="categories"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                placeholder="Fútbol, Entrevistas, F1..."
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageUpload" className="form-label">Subir Imagen</label>
                            <input type="file" className="form-control" id="imageUpload" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
                            {image && (
                                <div className="mt-3 text-center">
                                    <img src={image} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onHide}>Cancelar</button>
                    <button type="submit" form="news-form" className="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default NewsFormModal;