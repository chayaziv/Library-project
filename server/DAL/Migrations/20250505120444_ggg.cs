using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ggg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_Categories_CategoryId",
                table: "Book");

            migrationBuilder.DropForeignKey(
                name: "FK_CardRedemptions_Packages_PackageCode",
                table: "CardRedemptions");

            migrationBuilder.DropForeignKey(
                name: "FK_PackageSubscriptionCard_Packages_PackagesPackageCode",
                table: "PackageSubscriptionCard");

            migrationBuilder.RenameColumn(
                name: "PackagesPackageCode",
                table: "PackageSubscriptionCard",
                newName: "PackagesPackageCodePackageCode");

            migrationBuilder.RenameColumn(
                name: "PackageCode",
                table: "Packages",
                newName: "PackageCodePackageCode");

            migrationBuilder.RenameColumn(
                name: "PackageCode",
                table: "CardRedemptions",
                newName: "PackageCodePackageCode");

            migrationBuilder.RenameIndex(
                name: "IX_CardRedemptions_PackageCode",
                table: "CardRedemptions",
                newName: "IX_CardRedemptions_PackageCodePackageCode");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Book",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Book_Categories_CategoryId",
                table: "Book",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CardRedemptions_Packages_PackageCodePackageCode",
                table: "CardRedemptions",
                column: "PackageCodePackageCode",
                principalTable: "Packages",
                principalColumn: "PackageCodePackageCode",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PackageSubscriptionCard_Packages_PackagesPackageCodePackageCode",
                table: "PackageSubscriptionCard",
                column: "PackagesPackageCodePackageCode",
                principalTable: "Packages",
                principalColumn: "PackageCodePackageCode",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_Categories_CategoryId",
                table: "Book");

            migrationBuilder.DropForeignKey(
                name: "FK_CardRedemptions_Packages_PackageCodePackageCode",
                table: "CardRedemptions");

            migrationBuilder.DropForeignKey(
                name: "FK_PackageSubscriptionCard_Packages_PackagesPackageCodePackageCode",
                table: "PackageSubscriptionCard");

            migrationBuilder.RenameColumn(
                name: "PackagesPackageCodePackageCode",
                table: "PackageSubscriptionCard",
                newName: "PackagesPackageCode");

            migrationBuilder.RenameColumn(
                name: "PackageCodePackageCode",
                table: "Packages",
                newName: "PackageCode");

            migrationBuilder.RenameColumn(
                name: "PackageCodePackageCode",
                table: "CardRedemptions",
                newName: "PackageCode");

            migrationBuilder.RenameIndex(
                name: "IX_CardRedemptions_PackageCodePackageCode",
                table: "CardRedemptions",
                newName: "IX_CardRedemptions_PackageCode");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Book",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_Categories_CategoryId",
                table: "Book",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CardRedemptions_Packages_PackageCode",
                table: "CardRedemptions",
                column: "PackageCode",
                principalTable: "Packages",
                principalColumn: "PackageCode",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PackageSubscriptionCard_Packages_PackagesPackageCode",
                table: "PackageSubscriptionCard",
                column: "PackagesPackageCode",
                principalTable: "Packages",
                principalColumn: "PackageCode",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
