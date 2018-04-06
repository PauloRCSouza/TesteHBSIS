import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Book } from '../../Model/book'

interface CreateEditState {
    book: Book;
    loading: boolean;
    save: boolean
}
interface CreateEditProps {
    id: number
    dbaction: string
    onSave: any
}

export class CreateEdit extends React.Component<CreateEditProps, CreateEditState> {
    constructor(props: any){
   super(props);
        if (this.props.dbaction == "edit") {
            this.state = { book: new Book(), loading: true, save: false }
			fetch('api/Book/' + this.props.id, {method: 'get' })
                .then(response => response.json() as Promise<Book>)
                .then(data => {
            this.setState({ book: data, loading: false });
        });
        } else
            this.state = { book: new Book(), loading: false, save: false}

    }

    handleSave(e: any) {
        e.preventDefault()
        let method: string = (this.props.dbaction == "edit" ? "Update" : "Insert")
        let form = document.querySelector('#frmCreateEdit') as Element
        let id = document.getElementById('Id') as HTMLInputElement
        fetch('api/Book/' + method,
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
            item = new Book()
        return <form id='frmCreateEdit'>
            <label>Id</label>
            <input id='Id' name='Id' type='number' />
            <label>Title</label>
            <input id='Title' name='Title' type='text' defaultValue={item.title != null ? (item.title + '') : ''} />
            <label>Author</label>
            <input id='Author' name='Author' type='text' defaultValue={item.author != null ? (item.author + '') : ''} />
            <label>Numero de Paginas</label>
            <input id='NumPag' name='NumPag' type='number'  />
            </form>
    }

    formToJson = elements => [].reduce.call(elements, (data:any, element:any) => {
        console.log('formToJson()', element)
        
            data[element.name] = element.value;
            
        return data;
    }, {});

}