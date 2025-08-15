 class Audience {
    static idCount = 1 ;
    id : number ;
    name : string 
    email : string ; 
    phone : string ;

    constructor(name : string , email :string , phone : string ){
        this.id = Audience.idCount++ ; 
        this.name = name ; 
        this.email = email ; 
        this.phone = phone ; 
    }
    getDetails(){
        return `- ID khách hàng : ${this.id} , \n
                - Tên khách hàng : ${this.name} , \n 
                - Email khách hàng : ${this.email} ,\n 
                - SDT : ${this.phone}
                `
    }
 }
abstract class Movie {
    static idMovieCount = 1 
    id: number ; 
    title: string ;
    genre: string ; 
    ticketPrice: number ; 
    isShowing: boolean ;

    constructor(title : string , genre :string , ticketPrice : number , isShowing : boolean ){
        this.id = Movie.idMovieCount++ ; 
        this.title = title ; 
        this.genre = genre ; 
        this.ticketPrice = ticketPrice ; 
        this.isShowing = isShowing; 
    }
    startShow(){
        this.isShowing = true ; 
    }
    stopShow(){
        this.isShowing = false ; 
    }
    abstract calculateTicketCost(quantity: number) : number ;
    abstract getSpecialOffers(): string[] ;
    abstract getMovieInfo(): string ; 

}
class ActionMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        return this.ticketPrice * quantity;
    }

    getSpecialOffers(): string[] {
        return ["Miễn phí bắp rang", "Tặng poster"];
    }

    getMovieInfo(): string {
        return "Phim hành động gay cấn, kỹ xảo hoành tráng";
    }
}
class ComedyMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        if (quantity > 4) {
            return this.ticketPrice * quantity * 0.9;
        }
        return this.ticketPrice * quantity;
    }

    getSpecialOffers(): string[] {
        return ["Giảm 10% cho nhóm trên 4 người"];
    }

    getMovieInfo(): string {
        return "Phim hài nhẹ nhàng, vui nhộn";
    }
}
class AnimationMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        return this.ticketPrice * quantity * 0.8;
    }

    getSpecialOffers(): string[] {
        return ["Giảm giá cho trẻ em dưới 12 tuổi"];
    }

    getMovieInfo(): string {
        return "Phim hoạt hình với hình ảnh sống động ";
    }
}
class TicketBooking {
    static bookingIdCounter = 1;
    bookingId: number;
    audience: Audience;
    movie: Movie;
    quantity: number;
    totalPrice: number;

    constructor(audience: Audience, movie: Movie, quantity: number) {
        this.bookingId = TicketBooking.bookingIdCounter++;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.calculateTicketCost(quantity);
    }

    public getDetails(): string {
        return `Mã đặt vé: ${this.bookingId}\n` +
               `Khán giả: ${this.audience.getDetails()}\n` +
               `Phim: ${this.movie.title}\n` +
               `Số lượng vé: ${this.quantity}\n` +
               `Tổng tiền: ${this.totalPrice}`;
    }
}
class Cinema {
    movies : Movie[] = [] ; 
    audiences : Audience [] = [] ; 
    bookings : TicketBooking [] = []; 

    addMovie(movie : Movie) : void {
        this.movies.push(movie);
    }
    addAudience(name : string ,email : string , phone : string ) : Audience {
        const newAudience = new Audience(name, email, phone);
        this.audiences.push(newAudience);
        return newAudience;
    }
    findMovieById(collection: Movie[], id: number): Movie | undefined {
    return collection.find((movie) => movie.id === id);
    }
    findAudienceById(collection: Audience[], id: number): Audience | undefined {
    return collection.find((audience) => audience.id === id);    
    }
    bookTickets(audienceId: number, movieId: number, quantity: number): TicketBooking | null {
         const audience = this.findAudienceById(this.audiences, audienceId);
         const movie = this.findMovieById(this.movies, movieId);
         if (!audience || !movie || !movie.isShowing) {
             return null;
         }
         const newBooking = new TicketBooking(audience, movie, quantity);
         this.bookings.push(newBooking);
         return newBooking;
     }
    cancelMovie(movieId: number): void {
         const movie = this.findMovieById(this.movies, movieId);
         if (movie) {
             movie.stopShow();
         }
    }
    listShowingMovies(): Movie[] {
        return this.movies.filter((movie) => movie.isShowing);
    }
    listAudienceBookings(audienceId: number): TicketBooking[] {
       return this.bookings.filter((booking) => booking.audience.id === audienceId);
    }
    calculateTotalRevenue(): number {
       return this.bookings.reduce((total, booking) => total + booking.totalPrice, 0);
    }
    getMovieSpecialOffers(movieId: number): string[] | undefined {
        const movie = this.findMovieById(this.movies, movieId);
        return movie.getSpecialOffers();
    }
}
const cinema = new Cinema();

// 1. Thêm khán giả
cinema.addAudience("DucvipPromax16", "Ducvip16122004@gmail.com", "0931511560");
cinema.addAudience("Trang Chị Bun ", "bundeptrai@gmail.com", "0911111111");
console.log(" Danh sách khán giả:");
cinema.audiences.forEach((audience) => console.log(audience.getDetails()));

// 2. Thêm phim
cinema.addMovie(new ActionMovie(" Anh thợ sửa ống nước may mắn và cô chủ nhà xui xẻo ", "Hành động", 1000 , true));
cinema.addMovie(new ComedyMovie("Những bản nhạc bất hủ của Dé Soltuné Montepré ( aka Sơn Tùng ) ", "Hài", 999, true));
cinema.addMovie(new AnimationMovie("30 bài code thiếu nhi cho trẻ mẫu giáo ", "Hoạt hình",200 , false));

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
console.log("\n Tìm khách hàng 1:", foundAudience.getDetails());

// 10. Hiển thị ưu đãi của 1 phim 
console.log("\n  Ưu đãi phim 2:", cinema.getMovieSpecialOffers(1));
console.log("\n  Ưu đãi phim 2:", cinema.getMovieSpecialOffers(2));
console.log("\n  Ưu đãi phim 2:", cinema.getMovieSpecialOffers(3));
