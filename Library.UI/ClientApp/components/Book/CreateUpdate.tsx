//import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import * as Book from '../Book/model/book'

//interface CreateUpdateState {
//    book: Book.Book;
//    loading: boolean;
//    save: boolean
//}
//interface CreateEditProps {
//    id: number
//    dbaction: string
//    onSave?: any
//}


//class CreateUpdate extends React.Component<CreateEditProps,CreateUpdateState> {
//   constructor(props: any){
//   super(props);
//        if (this.props.dbaction == "edit") {
//            this.state = { book: new Book.Book(), loading: true, save: false}
//            fetch('api/BookController/' + this.props.id, {method: 'get' })
//                .then(response => response.json() as Promise<Book.Book>)
//                .then(data => {
//            this.setState({ book: data, loading: false });
//        });
//        } else
//            this.state = { book: new Book.Book(), loading: false, save: false}

//    }

//    handleSave(e: any) {
//        e.preventDefault()
//        let method: string = (this.props.dbaction == "edit" ? "Update" : "Insert")
//        let form = document.querySelector('#frmCreateUpdate') as Element
//        let id = document.getElementById('Id') as HTMLInputElement
//        fetch('api/BookController/' + method,
//            {
//                method: method,
//                headers: { 'Content-Type': 'application/json' },
//                body: JSON.stringify(this.formToJson(form))
//            }).then(data => {
//                this.setState({ save: false });
//                this.props.onSave(true);
//            });
//    }

//    public render() {
//        let contents = this.state.loading
//            ? <p> Loading ... </p>
//            : this.renderForm(this.state.book);
//        return <div>
//            <h1>{this.props.dbaction == "edit" ? "Editar Livro" : "Criar Livro"}</h1>
//            {contents}
//        </div>;
//    }

//    private renderForm(item: Book.Book) {
//        if (this.props.dbaction != "edit")
//            item = new Book.Book()
//        return <form id='frmCreateUpdate'>
//            <label>Id</label>
            
//            </form>
//    }

//    //formToJson =z

//}