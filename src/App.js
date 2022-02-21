import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from 'api/pixabayApi';
import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';
// import  ImageGalleryItem  from 'components/ImageGalleryItem';
import  Button  from 'components/Button';
import { AfterButton } from 'components/Button/AfterButton';
import  Modal  from 'components/Modal';
import Loader from 'components/Loader';

// import s from './App.module.css';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  PENDING_MORE: 'pending_more',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const params = {
  API_KEY: '25433386-4f25aa275c005ef248c74251b',
  image_type: 'photo',
  orientation: 'horizontal',
  PER_PAGE: 12,
}

class App extends Component {

  state = {
    images: [],
    query: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
    status: Status.IDLE,
  };

  // Произошло обновление
  
  componentDidUpdate(prevProps, prevState) {
  
    const { images, query, page  } = this.state;
    const loadNextPage = (page !== prevState.page && page !== 1);
     
    // Запуск функции - запроса
    if (query !== prevState.query || loadNextPage) {
           
      if (loadNextPage) { this.setState({ status: Status.PENDING_MORE }) }
      if (images.length === 0) { this.setState({ status: Status.PENDING }) }
      
      this.fetchImages();
   }
  }

  // Функция - запрос
  
  fetchImages = () =>
    // setTimeout(() =>
    // {
      {
    const { query, page } = this.state;

           
    fetchData(query, page, params)
      .then(({ hits, totalHits }) => {

        console.log(hits, totalHits)

        const totalPages = Math.ceil(totalHits / params.PER_PAGE);

        if (!hits.length) {
          this.setState({ status: Status.IDLE });
          return toast.error('Sorry, no images found. Please, try again!');
                  }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
      

        const newImages = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
                this.setState(({ images }) => ({
          images: [...images, ...newImages],
          total: totalHits,
          status: Status.RESOLVED
        }));
      })
      .catch(error => this.setState({
        error,
        status: Status.REJECTED
      }))
        }
//  }, 1000);
  
  // Методы
  
  handleSearchSubmit = query => {

     if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL
    }));
      };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
               }));
  };

  // Разметка

  render() {
const { images, error, showModal, largeImageURL, tags, total, status } =
      this.state;
    
    const loadMoreBtn =
      status === 'resolved'
      && images.length !== 0
      && images.length !== total;

    return (
      <Container>
      
        <Searchbar onSubmit={this.handleSearchSubmit} />
       
        {status === 'rejected' && toast.error(error.message)}

        {status === 'idle' && <div style={{ margin: 'auto' }}>PLEASE, INPUT A QUERY ! </div>}
                     
        {(status === 'resolved' || status === 'pending_more') && <ImageGallery images={images} onClick={this.toggleModal} />}
         {loadMoreBtn && <Button onClick={this.onLoadMore}>Load more</Button>}       
        {status === 'pending_more' && <AfterButton>Loading...</AfterButton>}
        
        {(status === 'pending' || status === 'pending_more') && <Loader />}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
            
        <ToastContainer theme="colored" position="top-right" autoClose={5000} />
      </Container>
          )
  }
}
export default App;
