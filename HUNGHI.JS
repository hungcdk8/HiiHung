const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn =$('.btn-next')
const prevBtn =$('.btn-prev')
const randomBtn = $('.btn-random')
const app = {
    currentIndex: 0,
    isplaying: false,
    isRandom: false,
    songs: [
        {
            name: 'À Lôi',
            singer:'Double2T, Masew',
            path: './CSS/MP3/A Loi - Double2T, Masew - NhacHayVN.mp3',
            image: 'https://img.ws.mms.shopee.vn/b9e94c4344542803341fec70e1b57163'
        },
        {
            name: 'Anh Cứ Đi Đi',
            singer:' Hari-Won',
            path: './CSS/MP3/Anh-Cu-Di-Di-Hari-Won.mp3',
            image: 'https://image.phunuonline.com.vn/fckeditor/upload/2022/20220629/images/doc-dao-voi-trang-phuc-cua-_851656486661.jpg'
        },
    
        {
            name: 'Cớ Sao Giờ Lại Chia Xa',
            singer:'Bích Phương',
            path: './CSS/MP3/Co-Sao-Gio-Lai-Chia-Xa-Bich-Phuong.mp3',
            image: 'https://dulichviet.com.vn/images/bandidau/Du-lich-Chau-a/trung-quoc/phuong-hoang-co-tran-mua-thu-du-lich-viet-2024.jpg'
        },
    
        {
            name: 'Giữ Lấy Làm Gì',
            singer:'Monstar',
            path: './CSS/MP3/Giu-Lay-Lam-Gi-Monstar.mp3',
            image: 'https://cattour.vn/images/upload/images/Phuong-Hoang-Co-Tran/thoi-tiet-phuong-hoang-co-tran/phuong-hoang-co-tran-thang-1.jpg'
        },
        {
            name: 'Là Anh',
            singer:'Phạm Lịch, BMZ',
            path: './CSS/MP3/La Anh - Pham Lich, BMZ - NhacHayVN.mp3',
            image: 'https://trainghiemsongbucket.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2021/05/29071312/1-450.jpeg'
        },
    
        {
            name: 'Là Anh Ngộ Nhận',
            singer:'Trung Dio',
            path: './CSS/MP3/La Anh Ngo Nhan - Trung Dio - NhacHayVN.mp3',
            image: 'https://image2.tin247.news/pictures/2024/01/01/kaq1704123210.jpg'
        },
    
        {
            name: 'Ngày Mai Người Ta Đi Lấy Chồng',
            singer:'Thành Đạt',
            path: './CSS/MP3/Ngay Mai Nguoi Ta Lay Chong - Thanh Dat - NhacHayVN.mp3',
            image: 'https://i.vietgiaitri.com/2022/5/22/nam-cosplayer-khien-dan-tinh-phat-sot-voi-tao-hinh-don-hoang-bo-tat-vua-thoat-tuc-vua-manh-me-926-6457692.jpg'
        },
    
        {
            name: 'Thu Cuối',
            singer:'Yanbi, Mr.T, Hằng BingBoong',
            path: './CSS/MP3/Thu Cuoi - Yanbi, Mr.T, Hang BingBoong - NhacHayVN.mp3',
            image: 'https://i.luctieumi.com/15603/co-trang-sexy-112.jpg'
        },
    
        {
            name: 'Xin Đừng Lặng Im',
            singer:'Soobin Hoàng Sơn',
            path: './CSS/MP3/Thu Cuoi - Yanbi, Mr.T, Hang BingBoong - NhacHayVN.mp3',
            image: 'https://i.bbcosplay.com/13786/quan-ao-mong-co-nu-nhan-5.jpg'
        },
    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
               <div class="song">
                   <div class="thumb" style="background-image:url('${song.image}')">
          
                   </div>
                   <div class="body">
                     <h3 class="title">${song.name}</h3>
                     <p class="author">${song.singer}</p>
                   </div>
                   <div class="option">
                     <i class="fas fa-ellipsis-h"></i>
                   </div>
               </div>
            `

        })
        $('.playlist').innerHTML = htmls.join('')
        

    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })

    },
    handleEvents: function () {
        

        const _this = this
        
        const cdWidth = cd.offsetWidth
        // Xử lý cd quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
         cdThumbAnimate.pause()

         //  Xử lý phóng to thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
           

            cd.style.width =  newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{ 
                audio.play()   
            }
            
        }
        //Khi Song playe
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

        } 
        // Khi song pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()


        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if (audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
               progress.value = progressPercent
            }

        }
        // Xử lý thi tua song
        progress.onchange = function(e){
           const seekTime = audio.duration /100 * e.target.value
           audio.currentTime = seekTime

        }
        // next song
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()

        }
        // prev song
        prevBtn.onclick = function(){
            _this.nextSong()
            audio.play()

        }
        //random
        randomBtn.onclick = function(e){
            randomBtn.classList.add('active')
        }

    },
    loadCurrentSong: function(){
        
        heading.textContent =  this.currentSong.name
        cdThumb.style.backgroundImage =`url('${this.currentSong.image}')`
        audio.src =  this.currentSong.path

    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length ){
            this.currentIndex = 0
        }
        this.loadCurrentSong()

    },
    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()

    },

    star: function () {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        

    },
};
app.star()
