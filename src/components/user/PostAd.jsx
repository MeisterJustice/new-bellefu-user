import React, {useState, useEffect} from 'react';
import {Col, Row, Card, Form, Container, Button, Badge} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'react-images-upload';
import {withRouter, Link, Redirect, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';
import jsonToFormData from 'json-form-data';
import Preloader from './Preloader';

function PostAd(props) {
    let productSuccess = null;
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState();

    const [productData, setProductData] = useState({
        title: '',
        price: '',
        phone: '',
        address: '',
        category: '',
        subcategory: '',
        plan: '',
        description: '',
        tags: '',
        product_images: undefined
    });

    const onDescriptionChange = val => {
        setProductData({...productData, description: val});
    };

    const {subcategory, category, plan, title, price, phone, address, description, tags, product_images} = productData;

    //ONCHANGE FOR IMAGE
    const onChangHandlerImage = e => {
        setProductData({...productData, product_images: e});
    };

    //ONCHANGE FOR OTHER INPUTS
    const onChangeHandler = e => {
        setProductData({...productData, [e.target.name]: e.target.value});
    };

    const onCategoryChange = (e) => {
        setProductData({...productData, category: e.target.value})
        loadSubCategory(e.target.value)
    }

    //======USER GLOBAL STATE FROM REDUX
    const userSignin = useSelector(state => state.userSignin);
    const {user} = userSignin;

    const onSubmitHandle = e => {
        e.preventDefault();
        setLoading(true);
        let options = {
            initialFormData: new FormData(),
            showLeafArrayIndexes: true,
            includeNullValues: false,
            mapping: function(value) {
                if (typeof value === 'boolean') {
                    return +value ? '1' : '0';
                }
                return value;
            }
        };

        let real_ad_data = jsonToFormData(productData, options);

        let url = 'https://bellefu.com/api/user/product/save';
        axios
            .post(url, real_ad_data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                productSuccess = res.data;
                console.log(productSuccess);
                setSuccess(productSuccess);
				setLoading(false);
				
            })
            .catch(error => {
                setErrors(error.response.data);
                console.log(error.response.data);
                setLoading(false);
            });
    };

    // ==============CATEGORY LIST STATE =========

    const [categoryData, setCategoryData] = useState([]);
    const loadCategory = () => {
        axios
            .get('https://bellefu.com/api/category/list', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setCategoryData(res.data.categories);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // ==============SUBCATEGORY LIST STATE =========

    const [subcategoryData, setSubCategoryData] = useState([]);
    const [notShow, setNotShow] = useState(true);
    const loadSubCategory = (category) => {
        axios
            .get(`https://bellefu.com/api/subcategory/listfor/${category}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                console.log(res)
                setSubCategoryData(res.data.subcategories);
                setNotShow(false);
            })
            .catch(error => {
                console.log(error);
            });
    };
    // TO GET PATHNAME
    let location = useLocation();

    useEffect(
        () => {
            loadCategory();
        },
        []
    );


    return (
        <div>
            {success && success.is_upgradable === true ? (
                <Redirect
                    to={{
                        pathname: `/payment/${success.product_details.product_slug}/${success.product_details
                            .product_plan}`,
                        state: success && success.product_details
                    }}
                />
            ) : null}
            {success && success.is_upgradable === false ? (
                <Redirect
                    to={`/post_sucess/${success && success.product_details.product_slug}/${success &&
                        success.is_upgradable}/${location.pathname}`}
                />
            ) : null}
            {loading && (
                <div style={{height: '100vh', width: '100%'}}>
                <Preloader />
            </div>
            )}
            <Form onSubmit={onSubmitHandle}>
                <Card className="border-0">
                    <Card.Header className="border-0" style={{backgroundColor: '#76ba1b'}}>
                        <b style={{color: 'white'}}>step 1</b>
                    </Card.Header>
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Choose Category</b>
                                </Form.Label>

                                <select
                                    className="uk-select cursor"
                                    name="category"
                                    value={category}
                                    onChange={onCategoryChange}
                                    >
                                    <option hidden>{'>>>>'} select category {"<<<<"}</option>
                                    {categoryData.map(data => (
                                        <option
                                        className="cursor"
                                            key={data.slug}
                                            value={data.slug}
                                            selected={category === data.slug ? true : false}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.errors && <p style={styles.formError}>{errors.errors.category}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Choose Sub Category</b>
                                </Form.Label>
                                <select
                                    className="uk-select cursor"
                                    name="subcategory"
                                    value={subcategory}
                                    onChange={e => onChangeHandler(e)}
                                    disabled={notShow}>
                                    <option hidden>{'>>>>'} select subcategory {"<<<<"}</option>
                                    {subcategoryData.map(data => (
                                        <option
                                        className="cursor"
                                            key={data.slug}
                                            value={data.slug}
                                            selected={subcategory === data.slug ? true : false}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.errors && <p style={styles.formError}>{errors.errors.subcategory}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Location</b>
                                </Form.Label>
                                <Form.Control
                                    name="address"
                                    value={address}
                                    onFocus={inputFocus}
                                    style={styles.input}
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.address}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Phone Number</b>
                                </Form.Label>
                                <Form.Control
                                    name="phone"
                                    value={phone}
                                    type="text"
                                    onChange={e => onChangeHandler(e)}
                                    onFocus={inputFocus}
                                    style={styles.input}
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.phone}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Price</b>
                                </Form.Label>
                                <Form.Control
                                    name="price"
                                    value={price}
                                    onChange={e => onChangeHandler(e)}
                                    onFocus={inputFocus}
                                    style={styles.input}
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.price}</p>}
                            </Col>
                        </Row>
                    </Container>
                </Card>

                <Card className="border-0 mt-4">
                    <Card.Header className="border-0" style={{backgroundColor: '#76ba1b'}}>
                        <b style={{color: 'white'}}>step 2</b>
                    </Card.Header>
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Title *</b>
                                </Form.Label>
                                <Form.Control
                                    name="title"
                                    value={title}
                                    onChange={e => onChangeHandler(e)}
                                    onFocus={inputFocus}
                                    style={styles.input}
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.title}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Tags *</b>
                                </Form.Label>
                                <Form.Control
                                    name="tags"
                                    value={tags}
                                    onChange={e => onChangeHandler(e)}
                                    placeholder="Enter the tags separated by commas."
                                    onFocus={inputFocus}
                                    style={styles.input}
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.tags}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Label className="mt-3" style={{opacity: '0.4', fontSize: '0.8em'}}>
                                    <b>Description *</b>
                                </Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    name="description"
                                    value={description}
                                    onChange={onDescriptionChange}
                                    row="3"
                                    style={{height: '300px', marginBottom: '100px'}}
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.description}</p>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Choose images"
                                    onChange={e => onChangHandlerImage(e)}
                                    imgExtension={['.jpg', '.png', '.jpeg']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    fileSizeError=" file size is too big"
                                />
                                {errors.errors && <p style={styles.formError}>{errors.errors.product_images}</p>}
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <Card className="border-0 mt-4" style={{marginBottom: '10%'}}>
                    <Card.Header className="border-0" style={{backgroundColor: '#76ba1b'}}>
                        <b style={{color: 'white'}}>step 3</b>
                    </Card.Header>
                    <Container>
                        {errors.errors && <p style={styles.formError}>{errors.errors.plan}</p>}
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="mt-3 bg-light" style={{padding: '20px'}}>
                                    <Form.Check
                                        type="radio"
                                        name="plan"
                                        value="free"
                                        onChange={e => onChangeHandler(e)}
                                        aria-label="free ad"
                                        label="Free Ad"
                                        id="formHorizontalRadios1"
                                    />
                                </div>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
                                <div style={{padding: '20px'}}>
                                    <Form.Check
                                        type="radio"
                                        name="plan"
                                        value="featured"
                                        onChange={e => onChangeHandler(e)}
                                        aria-label="Featured"
                                        label="Featured"
                                        id="formHorizontalRadios2"
                                    />
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>
                                    Featured ads attract higher-quality viewer and are displayed prominently in the
                                    Featured ads section home page.
                                </p>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>$1.00 for 30 days</p>
                                <Badge variant="warning" style={{color: 'white'}}>
                                    RECOMMENDED
                                </Badge>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
                                <div style={{padding: '20px'}}>
                                    <Form.Check
                                        type="radio"
                                        name="plan"
                                        value="urgent"
                                        aria-label="Urgent"
                                        onChange={e => onChangeHandler(e)}
                                        label="Urgent"
                                        id="formHorizontalRadios2"
                                    />
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>Make your ad stand out and let viewer know that your advertise is time sensitive.</p>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>$2.00 for 7 days</p>
                                <Badge variant="danger">MORE RECOMMENDED</Badge>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
                                <div style={{padding: '20px'}}>
                                    <Form.Check
                                        type="radio"
                                        name="plan"
                                        onChange={e => onChangeHandler(e)}
                                        value="highlighted"
                                        aria-label="Highlighted"
                                        label="Highlighted"
                                        id="formHorizontalRadios2"
                                    />
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>
                                    Make your ad highlighted with border in listing search result page. Easy to focus.
                                </p>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-3" style={{padding: '20px'}}>
                                <p>$3.00 for 45 days</p>
                                <Badge variant="success">MUST RECOMMENDED</Badge>
                            </Col>
                        </Row>

                        <Button style={styles.btn} variant="warning" size="sm" type="submit" onClick={onSubmitHandle}>
                            <b>Post</b>
                        </Button>
                    </Container>
                </Card>
            </Form>
        </div>
    );
}

const inputFocus = e => {
    e.target.style.outLineColor = 'none';
};

const styles = {
    btn: {
        marginTop: '30px',
        marginBottom: '30px',
        backgroundColor: '#ffa500',
        border: 'none',
        color: 'white',
        fontSize: '17px',
        width: '100px',
        height: '40px'
    },
    input: {
        boxShadow: 'none'
    },
    formError: {
        fontSize: '0.7em',
        color: 'red',
        marginTop: '10px'
    }
};
export default withRouter(PostAd);
