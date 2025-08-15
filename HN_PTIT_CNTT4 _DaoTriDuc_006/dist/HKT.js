class Audience {
    constructor(name, email, phone) {
        this.id = Audience.idCount++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `- ID khách hàng : ${this.id} , \n
                - Tên khách hàng : ${this.name} , \n 
                - Email khách hàng : ${this.email} ,\n 
                - SDT : ${this.phone}
                `;
    }
}
Audience.idCount = 1;
class Movie {
    constructor(title, genre, ticketPrice, isShowing) {
        this.id = Movie.idMovieCount++;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
        this.isShowing = isShowing;
    }
    startShow() {
        this.isShowing = true;
    }
    stopShow() {
        this.isShowing = false;
    }
}
Movie.idMovieCount = 1;
class ActionMovie extends Movie {
    calculateTicketCost(quantity) {
        return this.ticketPrice * quantity;
    }
    getSpecialOffers() {
        return ["Miễn phí bắp rang", "Tặng poster"];
    }
    getMovieInfo() {
        return "Phim hành động gay cấn, kỹ xảo hoành tráng";
    }
}
class ComedyMovie extends Movie {
    calculateTicketCost(quantity) {
        if (quantity > 4) {
            return this.ticketPrice * quantity * 0.9;
        }
        return this.ticketPrice * quantity;
    }
    getSpecialOffers() {
        return ["Giảm 10% cho nhóm trên 4 người"];
    }
    getMovieInfo() {
        return "Phim hài nhẹ nhàng, vui nhộn";
    }
}
class AnimationMovie extends Movie {
    calculateTicketCost(quantity) {
        return this.ticketPrice * quantity * 0.8;
    }
    getSpecialOffers() {
        return ["Giảm giá cho trẻ em dưới 12 tuổi"];
    }
    getMovieInfo() {
        return "Phim hoạt hình với hình ảnh sống động ";
    }
}
class TicketBooking {
    constructor(audience, movie, quantity) {
        this.bookingId = TicketBooking.bookingIdCounter++;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.calculateTicketCost(quantity);
    }
    getDetails() {
        return `Mã đặt vé: ${this.bookingId}\n` +
            `Khán giả: ${this.audience.getDetails()}\n` +
            `Phim: ${this.movie.title}\n` +
            `Số lượng vé: ${this.quantity}\n` +
            `Tổng tiền: ${this.totalPrice}`;
    }
}
TicketBooking.bookingIdCounter = 1;
class Cinema {
    constructor() {
        this.movies = [];
        this.audiences = [];
        this.bookings = [];
    }
    addMovie(movie) {
        this.movies.push(movie);
    }
    addAudience(name, email, phone) {
        const newAudience = new Audience(name, email, phone);
        this.audiences.push(newAudience);
        return newAudience;
    }
    findMovieById(collection, id) {
        return collection.find((movie) => movie.id === id);
    }
    findAudienceById(collection, id) {
        return collection.find((audience) => audience.id === id);
    }
    bookTickets(audienceId, movieId, quantity) {
        const audience = this.findAudienceById(this.audiences, audienceId);
        const movie = this.findMovieById(this.movies, movieId);
        if (!audience || !movie || !movie.isShowing) {
            return null;
        }
        const newBooking = new TicketBooking(audience, movie, quantity);
        this.bookings.push(newBooking);
        return newBooking;
    }
    cancelMovie(movieId) {
        const movie = this.findMovieById(this.movies, movieId);
        if (movie) {
            movie.stopShow();
        }
    }
    listShowingMovies() {
        return this.movies.filter((movie) => movie.isShowing);
    }
    listAudienceBookings(audienceId) {
        return this.bookings.filter((booking) => booking.audience.id === audienceId);
    }
    calculateTotalRevenue() {
        return this.bookings.reduce((total, booking) => total + booking.totalPrice, 0);
    }
}
const cinema = new Cinema();
// 1. Thêm khán giả
cinema.addAudience("DucvipPromax16", "Ducvip16122004@gmail.com", "0931511560");
cinema.addAudience("Trang Chị Bun ", "bundeptrai@gmail.com", "0911111111");
console.log(" Danh sách khán giả:");
cinema.audiences.forEach((audience) => console.log(audience.getDetails()));
// 2. Thêm phim
cinema.addMovie(new ActionMovie(" Anh thợ sửa ống nước may mắn và cô chủ nhà xui xẻo ", "Hành động", 1000, true));
cinema.addMovie(new ComedyMovie("Những bản nhạc bất hủ của Dé Soltuné Montepré ( aka Sơn Tùng ) ", "Hài", 999, true));
cinema.addMovie(new AnimationMovie("30 bài code thiếu nhi cho trẻ mẫu giáo ", "Hoạt hình", 200, false));
console.log("\n Danh sách phim:");
cinema.movies.forEach((movie) => {
    console.log(`${movie.title} - Thể loại: ${movie.genre} , \n 
                                - Đang chiếu: ${movie.isShowing}`);
});
// 3. Đặt vé
const booking1 = cinema.bookTickets(1, 1, 2);
const booking2 = cinema.bookTickets(2, 2, 5);
console.log("\n Kết quả đặt vé:");
console.log(booking1 ? booking1.getDetails() : "Không đặt được vé!");
console.log(booking2 ? booking2.getDetails() : "Không đặt được vé!");
// 4. Ngừng chiếu phim hoạt hình
cinema.cancelMovie(3);
// 5. Hiển thị phim đang chiếu
console.log("\n Các phim đang chiếu:");
cinema.listShowingMovies().forEach((movie) => console.log(movie.title));
// 7. Tổng doanh thu:
console.log("\n Tổng doanh thu:", cinema.calculateTotalRevenue());
// 9. Tìm kiếm thông tin khán giả theo ID:
const foundAudience = cinema.findAudienceById(cinema.audiences, 1);
console.log("\n Tìm khán giả #1:", foundAudience.getDetails());
