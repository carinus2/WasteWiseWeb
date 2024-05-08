import { Component, OnInit } from '@angular/core';
import { RegistrationUserDto } from '../../models/RegistrationUserDto';
import { RegistrationUserService } from '../../services/RegistrationUserService';
import { UserService } from '../../services/UserService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserDto } from '../../models/EditUserDto';
@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})

export class AdminComponentComponent implements OnInit {
  isAdminPage: boolean = true;
  registrationUsers: RegistrationUserDto[] = [];
  displayEditModal: boolean = false;
  editUserForm!: FormGroup;
  selectedUserId!: number;

  constructor(
    private registrationUserService: RegistrationUserService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      homeAddress: ['', Validators.required]
    });
   this.getUsers();
  }

  getUsers(){
    this.registrationUserService.getRegistrationUsers().subscribe(
      (users) => {
        this.registrationUsers = users;
      },
      (error) => {
        console.error('Error fetching registration users:', error);
      }
    );
  }

  editUser(user: RegistrationUserDto): void {
    this.selectedUserId = user.id;
    this.toggleModal();
  }

  deleteUser(user: RegistrationUserDto): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.registrationUsers = this.registrationUsers.filter(u => u.id !== user.id);
          alert('User deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      });
    }
  }

  deleteUser(user: RegistrationUserDto): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.registrationUsers = this.registrationUsers.filter(u => u.id !== user.id);
          alert('User deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      });
    }
  }  

  onCancel(){
    this.toggleModal();
  }

  onSave(){
      const editUserDto : EditUserDto = {
        email: this.editUserForm.value.email,
        firstName: this.editUserForm.value.firstName,
        lastName: this.editUserForm.value.lastName,
        phoneNumber: this.editUserForm.value.phoneNumber,
        homeAddress: this.editUserForm.value.homeAddress,
      }
      this.userService.editUser(this.selectedUserId,editUserDto).subscribe({
        next: (response) => {
          this.getUsers()
          this.toggleModal();
        },
        error: (error) => console.log(error)
      })
  }

  toggleModal(){
    this.displayEditModal = !this.displayEditModal;
  }
}
