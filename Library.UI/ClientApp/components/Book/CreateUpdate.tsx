import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Book from '../Book/model/book'

interface CreateUpdateState {
    book: Book.Book;
    loading: boolean;
    save: boolean
}
interface CreateUpdateProps {
    id: number
    dbaction: string
    onSave: any
}

export class CreateUpdate extends React.Component<CreateUpdateProps, CreateUpdateState> {
   constructor(props: any){
   super(props);
        if (this.props.dbaction == "edit") {
            this.state = { book: new Book.Book(), loading: true, save: false }
			fetch('api/BookController/' + this.props.id, {method: 'get' })
                .then(response => response.json() as Promise<Book.Book>)
                .then(data => {
            this.setState({ book: data, loading: false });
        });
        } else
            this.state = { book: new Book.Book(), loading: false, save: false}

    }

    handleSave(e: any) {
        e.preventDefault()
        let method: string = (this.props.dbaction == "edit" ? "Update" : "Insert")
        let form = document.querySelector('#frmCreateEdit') as Element
        let id = document.getElementById('Id') as HTMLInputElement
        fetch('api/BookController/' + method,
            {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formToJson(form))
            }).then(data => {
                this.setState({ save: false });
                this.props.onSave(true);
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p> Loading ... </p>
            : this.renderForm(this.state.book);
        return <div>
            <h1>{this.props.dbaction == "edit" ? "Edit Actor" : "Create Action"}</h1>
            {contents}
        </div>;
    }

    private renderForm(item: Book) {
        if (this.props.dbaction != "edit")
            item = new Book.Book()
        return <form id='frmCreateUpdate'>
            <label>Id</label>
            <input id='Id' name='Id' type='number' />
            <label>Ano</label>
            <input id='Year' name='Year' type='number' />
            <label>Titulo</label>
            <input id='Title' name='Title' type='text' defaultValue={item.title != null ? (item.title + '') : ''} />
            <label>Autor</label>
            <input id='Author' name='Author' type='text' defaultValue={item.author != null ? (item.author + '') : ''} />
            <label>Edição</label>
            <input id='Edition' name='Edition' type='text' />
            <label>Editora</label>
            <input id='Editor' name='Editor' type='text' />
            <label>ISBN</label>
            <input id='ISBN' name='ISBN' type='text' />
            </form>
    }

    formToJson = elements => [].reduce.call(elements, (data:any, element:any) => {
        console.log('formToJson()', element)
        
            data[element.name] = element.value;
            
        return data;
    }, {});

}