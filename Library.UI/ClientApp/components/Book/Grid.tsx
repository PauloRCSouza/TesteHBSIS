import * as React from 'react';
import { render } from 'react-dom';
//import * as Modal from 'react-modal';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';  
import * as Book from '../Book/model/book';
//import { CreateUpdate } from './CreateUpdate';

interface GridState {
    books: Book.Book[];
    book: Book.Book;
    loading: boolean;
    activeId: number;
    onSave?: any;
}


export class GridBooks extends React.Component<RouteComponentProps<{}>, GridState> {
    constructor(props: any) {
        super(props);
        this.state = { books: [],book:new Book.Book, loading: true,activeId: 0};

        fetch('api/BookController/GetList')
            .then(response => response.json() as Promise<Book.Book[]>,null)
            .then(data => {
                this.setState({ books: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBookTable(this.state.books);

        return <div>
            <h1>Consulta de Livros</h1>
            <form id='frmCreateUpdate'>
                <label>Titulo</label>
                <input key='Title' />
                <label>Autor</label>
                <input key='Author'/>
                <label>Edicao</label>
                <input key="Edition" />
                <label>Editora</label>
                <input key='Editor'/>
                <label>ISBN</label>
                <input key='ISBN'/>
                <button className="action" onClick={this.handleSave.bind(this)}>Salvar</button>
                {contents}
            </form>
            
        </div>;
    }

    private renderBookTable(books: Book.Book[]) {
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
                {books.map((item, i) =>
                    <tr key={i}>
                        <td>
                            <button className="action btn btn-danger" onClick={(id) => this.handleDelete(item.id)}></button>
                            <button className="action btn btn-success" onClick={(id) => this.handleEdit(item.id)}></button>
                        </td> 
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.year}</td>
                        <td>{item.author}</td>
                        <td>{item.edition}</td>
                        <td>{item.editor}</td>
                        <td>{item.isbn}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    //private renderFormContent() {
    //    switch (this.state.modalState) {
    //        case ModalState.create:
    //            return <CreateUpdate id={null} dbaction="create"
    //                onSave={this.handleSave.bind(this)} />
    //        case ModalState.edit:
    //            return <CreateUpdate id={this.state.activeId} dbaction="edit"
    //                onSave={this.handleSave.bind(this)} />
    //    }
    //}

    //#endregion


    //#region Handlers


    handleCreate() {
        this.setState({ })
    }

    handleEdit(id: number) {
        fetch('api/BookController/GetList'+id)
            .then(response => response.json() as Promise<Book.Book>, null)
            .then(data => {
                this.setState({  book: data, loading: false,activeId: 0 });
            });
    }

    handleDelete(id: number) {
        if (!confirm('Confirma a exclusão do Livro?'))
            return
        fetch('api/BookController/Delete' + id, { method: 'delete' })
            .then(data => {
                this.setState(
                    {
                        books: this.state.books.filter((ret) => {
                            return (ret.id != id);
                        })
                    });
            });
    }

    //closeModal() {
    //    this.setState({ modalState: ModalState.noModal });
    //}

    handleSave(e: Book.Book) {
        let method: string = (e.id == 0 ? "Update" : "Insert")
        let form = document.querySelector('#frmCreateUpdate') as Element
        let id = document.getElementById('Id') as HTMLInputElement
        fetch('api/BookController/' + method,
            {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formToJson(form))
            }).then(data => {
                this.setState({ onSave: false });
                this.state.onSave(true);
            });
    }

    formToJson = elements => [].reduce.call(elements, (data, element) => {
        console.log('formToJson()', element)

        data[element.name] = element.value;

        return data;
    }, {});

}
