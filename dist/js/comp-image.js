import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const storage = getStorage();

const imageRef = ref(storage, '');

const app = Vue.createApp({
    data() {
        return {
            listSrc: []
        }
    },

    methods: {
        deleteImageItem(n) {
            console.log(this.listSrc.indexOf(this.listSrc[n]));
            this.listSrc.splice(this.listSrc.indexOf(this.listSrc[n]), this.listSrc.indexOf(this.listSrc[n]))

            console.log(this.listSrc);

            // deleteObject(ref(storage, this.listSrc[n].baseRef)).then(() => {
            //     this.listSrc.filter(item => item.id != n);
            // })
        }
    },

    created() {
        listAll(imageRef)
        .then((res) => {
            res.items.forEach((itemRef, index) => {
                getDownloadURL(ref(storage, itemRef)).then((url) => {
                    this.listSrc.push({id: index, src: url, baseRef: itemRef.fullPath})
                })
            });
        })
    }
})

app.component('image-item', {
    props: ["image"],

    template: `
        <div class="card-gall-image">
            <div class="card-gall-image__img">
                <img :src="image.src">
            </div>

            <div class="card-gall-image__delete" v-on:click="$emit('deleteImage', image.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0)">
                        <path d="M15.3101 8.69519C14.9997 8.69519 14.748 8.9468 14.748 9.25725V19.8802C14.748 20.1904 14.9997 20.4423 15.3101 20.4423C15.6206 20.4423 15.8722 20.1904 15.8722 19.8802V9.25725C15.8722 8.9468 15.6206 8.69519 15.3101 8.69519Z" fill="#1F7240"></path>
                        <path d="M8.6773 8.69519C8.36684 8.69519 8.11523 8.9468 8.11523 9.25725V19.8802C8.11523 20.1904 8.36684 20.4423 8.6773 20.4423C8.98775 20.4423 9.23936 20.1904 9.23936 19.8802V9.25725C9.23936 8.9468 8.98775 8.69519 8.6773 8.69519Z" fill="#1F7240"></path>
                        <path d="M3.84439 7.14479V20.9927C3.84439 21.8112 4.14452 22.5799 4.66881 23.1314C5.19069 23.6845 5.91698 23.9984 6.67707 23.9998H17.3114C18.0717 23.9984 18.798 23.6845 19.3197 23.1314C19.844 22.5799 20.1441 21.8112 20.1441 20.9927V7.14479C21.1863 6.86815 21.8617 5.86127 21.7222 4.79182C21.5826 3.72259 20.6717 2.92276 19.5932 2.92254H16.7155V2.21996C16.7188 1.62914 16.4852 1.06181 16.067 0.644441C15.6487 0.227288 15.0805 -0.00500049 14.4897 -0.000170291H9.49878C8.90796 -0.00500049 8.33976 0.227288 7.92151 0.644441C7.50326 1.06181 7.26965 1.62914 7.27294 2.21996V2.92254H4.39525C3.3168 2.92276 2.40587 3.72259 2.26623 4.79182C2.12681 5.86127 2.80216 6.86815 3.84439 7.14479ZM17.3114 22.8756H6.67707C5.71609 22.8756 4.9685 22.0501 4.9685 20.9927V7.19419H19.02V20.9927C19.02 22.0501 18.2724 22.8756 17.3114 22.8756ZM8.39706 2.21996C8.39333 1.9273 8.50838 1.64561 8.71607 1.43901C8.92355 1.23241 9.2059 1.1189 9.49878 1.12395H14.4897C14.7826 1.1189 15.0649 1.23241 15.2724 1.43901C15.4801 1.64539 15.5951 1.9273 15.5914 2.21996V2.92254H8.39706V2.21996ZM4.39525 4.04666H19.5932C20.152 4.04666 20.6049 4.4996 20.6049 5.05836C20.6049 5.61713 20.152 6.07007 19.5932 6.07007H4.39525C3.83648 6.07007 3.38354 5.61713 3.38354 5.05836C3.38354 4.4996 3.83648 4.04666 4.39525 4.04666Z" fill="#1F7240"></path>
                        <path d="M11.9937 8.69519C11.6833 8.69519 11.4316 8.9468 11.4316 9.25725V19.8802C11.4316 20.1904 11.6833 20.4423 11.9937 20.4423C12.3042 20.4423 12.5558 20.1904 12.5558 19.8802V9.25725C12.5558 8.9468 12.3042 8.69519 11.9937 8.69519Z" fill="#1F7240"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    `
})

app.mount(".gall-image");