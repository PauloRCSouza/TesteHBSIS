import * as React from 'react';
import * as Modal from 'react-modal';
import { CreateEdit } from '../CreateEdit/CreateEditModal'
import { RouteComponentProps } from 'react-router';
import * as Book from '../../Model/book';

enum ModalState {
    create = 1,
    edit = 2,
    noModal = 3
}

interface BookState {
    book: Book.Book[]
    loading: boolean,
    modalState: ModalState,
    activeId: number
}

export class Books extends React.Component<RouteComponentProps<{}>, BookState>{

    //#region Constructor

    constructor(props: any) {
        super(props);
        this.state = {
            book: [],
            loading: true,
            modalState: ModalState.noModal,
            activeId: 0
        };

    //#endregion Constructor

    fetch('api/Book/Get')
        .then(response => response.json() as Promise<Book.Book[]>)
        .then(data => {
            this.setState({
                book: data,
                loading: false,
            });
        });
    }

    //#region Render

    public render() {

        this.renderPopup();

        let contents = this.state.loading
            ? <p> Loading ... </p>
            : this.renderTable(this.state.book);

        return <div>
            <h1> Books </h1>
            <button className="action" onClick={this.handleCreate.bind(this)}>Create</button>    
            {contents}
        </div>;
    }


    private renderTable(books: Book.Book[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Author</th>
                    <th>Edition</th>
                    <th>Editor</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                {books.map((item,i) =>
                    <tr key={i}>
                        <td>
                            <button className="action btn btn-danger"  onClick={(id) => this.handleDelete(item.id)}></button>
                            <button className="action btn btn-success" onClick={(id) => this.handleEdit(item.id)}></button>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.year}</td>
                        <td>{item.author}</td>
                        <td>{item.editon}</td>
                        <td>{item.editor}</td>
                        <td>{item.isbn}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }


    private renderPopup() {
        if (this.state.modalState == ModalState.noModal)
            return null
        return <Modal
            isOpen={true}
            contentLabel="crawl">
            <button onClick={this.closeModal.bind(this)} className="action" title="Close"></button>
            {this.renderPopupContent()}
            </Modal>
    }

    private renderPopupContent() {
        switch (this.state.modalState) {
            case ModalState.create:
                return <CreateEdit id={0} dbaction="create" 
                    onSave={this.handlePopupSave.bind(this)}/>
            case ModalState.edit:
                return <CreateEdit id={this.state.activeId} dbaction="edit"
                    onSave={this.handlePopupSave.bind(this)} />
        }
    }

    //#endregion


    //#region Handlers

    handleCreate() {
        this.setState({ modalState: ModalState.create })
    }

    handleEdit(id: number) {
        this.setState({ modalState: ModalState.edit })
    }

    handleDelete(id: number) {
        if (!confirm('Deseja excluir o registro?'))
            return
        fetch('api/Book/Delete' + id, { method: 'delete' })
            .then(data => {
                this.setState(
                    {
                        book: this.state.book.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
    }

    closeModal() {
        this.setState({ modalState: ModalState.noModal });
    }

    handlePopupSave(success: boolean) {
        if (success)
            this.setState({ modalState: ModalState.noModal });
    }

    //#endregion

}

