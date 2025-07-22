using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class o : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    BookCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PointsPerDay = table.Column<int>(type: "int", nullable: false),
                    PointsPerWeek = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.BookCode);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    PackageCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PointCount = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.PackageCode);
                });

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserCode = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionCards",
                columns: table => new
                {
                    PurchaseCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionCards", x => x.PurchaseCode);
                });

            migrationBuilder.CreateTable(
                name: "CardRedemptions",
                columns: table => new
                {
                    QuestionCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateOfQuestion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    balance = table.Column<int>(type: "int", nullable: false),
                    PointsDeducted = table.Column<int>(type: "int", nullable: false),
                    PackageCode = table.Column<int>(type: "int", nullable: false),
                    idPackage = table.Column<int>(type: "int", nullable: false),
                    booksBookCode = table.Column<int>(type: "int", nullable: false),
                    idbooks = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardRedemptions", x => x.QuestionCode);
                    table.ForeignKey(
                        name: "FK_CardRedemptions_Book_booksBookCode",
                        column: x => x.booksBookCode,
                        principalTable: "Book",
                        principalColumn: "BookCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardRedemptions_Packages_PackageCode",
                        column: x => x.PackageCode,
                        principalTable: "Packages",
                        principalColumn: "PackageCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PackageSubscriptionCard",
                columns: table => new
                {
                    PackagesPackageCode = table.Column<int>(type: "int", nullable: false),
                    SubscriptionCardsPurchaseCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageSubscriptionCard", x => new { x.PackagesPackageCode, x.SubscriptionCardsPurchaseCode });
                    table.ForeignKey(
                        name: "FK_PackageSubscriptionCard_Packages_PackagesPackageCode",
                        column: x => x.PackagesPackageCode,
                        principalTable: "Packages",
                        principalColumn: "PackageCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PackageSubscriptionCard_SubscriptionCards_SubscriptionCardsPurchaseCode",
                        column: x => x.SubscriptionCardsPurchaseCode,
                        principalTable: "SubscriptionCards",
                        principalColumn: "PurchaseCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardRedemptions_booksBookCode",
                table: "CardRedemptions",
                column: "booksBookCode");

            migrationBuilder.CreateIndex(
                name: "IX_CardRedemptions_PackageCode",
                table: "CardRedemptions",
                column: "PackageCode");

            migrationBuilder.CreateIndex(
                name: "IX_PackageSubscriptionCard_SubscriptionCardsPurchaseCode",
                table: "PackageSubscriptionCard",
                column: "SubscriptionCardsPurchaseCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardRedemptions");

            migrationBuilder.DropTable(
                name: "PackageSubscriptionCard");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "SubscriptionCards");
        }
    }
}
